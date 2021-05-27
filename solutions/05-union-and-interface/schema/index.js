import graphqlM from 'graphql';
import characterInterface from './interfaces/Character.js';
import viewerType from './types/Viewer.js';
import humanType from './types/Human.js';
import droidType from './types/Droid.js';
import wookieType from './types/Wookie.js';
import planetType from './types/Planet.js';
import filmType from './types/Film.js';
import HumanOrder from './inputs/HumanOrder.js';
import DiameterFilter from './inputs/DiameterFilter.js';
import StarWarsSaga from './enums/StarWarsSaga.js';

const { GraphQLObjectType, GraphQLList, GraphQLSchema } = graphqlM;

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: {
      type: viewerType,
      resolve: (obj, args, { viewer }) => {
        return viewer;
      },
    },
    characters: {
      type: new GraphQLList(characterInterface),
      // args: {
      //   orderBy: {
      //     type: HumanOrder,
      //     defaultValue: { field: 'name', direction: 'ASC' },
      //   },
      // },
      resolve: async (_, { orderBy, gender }, { supabase }) => {
        const query = supabase
          .from('character')
          .select('human_id(*),droid_id(*),wookie_id(*)')
          // .order(orderBy.field, { ascending: orderBy.direction === 'ASC' })
          ;

        // if (gender) {
        //   query.filter('gender', 'eq', gender);
        // }

        const { data } = await query;

        return data.map(character => {
          if (character.human_id) {
            return {...character.human_id, __typename: 'Human'};
          }
          if (character.droid_id) {
            return {...character.droid_id, __typename: 'Droid'};
          }
          if (character.wookie_id) {
            return {...character.wookie_id, __typename: 'Wookie'};
          }
          return null;
        });
      },
    },
    planets: {
      type: new GraphQLList(planetType),
      args: {
        diameter: {
          type: DiameterFilter,
        },
      },
      resolve: async (_, { diameter }, { supabase }) => {
        const query = supabase.from('planet').select('*');

        if (diameter !== null) {
          const { min, max } = diameter;
          query.gte('diameter', min).lte('diameter', max);
        }

        const { data } = await query;
        return data;
      },
    },
    films: {
      type: new GraphQLList(filmType),
      args: {
        saga: {
          type: StarWarsSaga,
        },
      },
      resolve: async (_, { saga }, { supabase }) => {
        const { data } = await supabase
          .from('film')
          .select('*')
          .filter('saga', 'eq', saga);
        return data;
      },
    },
  },
});

export default new GraphQLSchema({ query: queryType, types: [humanType, droidType, wookieType] });
