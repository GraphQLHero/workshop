import graphqlM from 'graphql';
import characterInterface from './interfaces/Character.js';
import viewerType from './types/Viewer.js';
import humanType from './types/Human.js';
import droidType from './types/Droid.js';
import wookieType from './types/Wookie.js';
import planetType from './types/Planet.js';
import filmType from './types/Film.js';
import CharacterOrder from './inputs/CharacterOrder.js';
import DiameterFilter from './inputs/DiameterFilter.js';
import StarWarsSaga from './enums/StarWarsSaga.js';
import SearchResultItem from './unions/SearchResultItem.js';

const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLSchema } = graphqlM;

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: {
      type: viewerType,
      resolve: (obj, args, { viewer }) => {
        return viewer;
      },
    },
    search: {
      type: new GraphQLNonNull(new GraphQLList(SearchResultItem)),
      args: {
        query: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (_, {query}, { supabase }) => {
        const { data: humans } = await supabase
        .from('human')
        .select('*')
        .textSearch('name', query, { type: 'websearch', config: 'english' });

        const { data: planets } = await supabase
        .from('planet')
        .select('*')
        .textSearch('name', query, { type: 'websearch', config: 'english' });

        const { data: films } = await supabase
        .from('film')
        .select('*')
        .textSearch('title', query, { type: 'websearch', config: 'english' });

        return [...humans, ...planets, ...films];
      },
    },
    characters: {
      type: new GraphQLList(characterInterface),
      args: {
        orderBy: {
          type: CharacterOrder,
          defaultValue: { field: 'id', direction: 'DESC' },
        },
      },
      resolve: async (_, { orderBy }, { supabase }) => {
        const query = supabase
          .from('character')
          .select('human_id(*),droid_id(*),wookie_id(*)')
          .order(orderBy.field, { ascending: orderBy.direction === 'ASC' })
          ;

        const { data } = await query;
        return data.map(o => o.human_id || o.droid_id || o.wookie_id);;
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
