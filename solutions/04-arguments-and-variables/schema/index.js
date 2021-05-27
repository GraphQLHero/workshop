import graphqlM from 'graphql';
import viewerType from './types/Viewer.js';
import humanType from './types/Human.js';
import planetType from './types/Planet.js';
import filmType from './types/Film.js';
import HumanOrder from './inputs/HumanOrder.js';
import DiameterFilter from './inputs/DiameterFilter.js';
import StarWarsSaga from './enums/StarWarsSaga.js';
import HumanGender from './enums/HumanGender.js';

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
    humans: {
      type: new GraphQLList(humanType),
      args: {
        orderBy: {
          type: HumanOrder,
          defaultValue: { field: 'name', direction: 'ASC' },
        },
        gender: {
          type: HumanGender,
        },
      },
      resolve: async (_, { orderBy, gender }, { supabase }) => {
        const query = supabase
          .from('human')
          .select('*')
          .order(orderBy.field, { ascending: orderBy.direction === 'ASC' });

        if (gender) {
          query.filter('gender', 'eq', gender);
        }

        const { data } = await query;
        return data;
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

        if (diameter) {
          const { min, max } = diameter;
          query.gte('diameter', min).lte('diameter', max);
        }

        const { data, error } = await query;
        if (error) {
          console.error(error);
        }
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

export default new GraphQLSchema({ query: queryType });
