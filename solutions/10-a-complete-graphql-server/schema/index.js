import graphqlM from 'graphql';
import viewerType from './types/Viewer.js';
import humanType from './types/Human.js';
import planetType from './types/Planet.js';
import filmType from './types/Film.js';

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
      resolve: async (obj, args, { supabase }) => {
        const { data } = await supabase.from('human').select('*');
        return data;
      },
    },
    planets: {
      type: new GraphQLList(planetType),
      resolve: async (obj, args, { supabase }) => {
        const { data } = await supabase.from('planet').select('*');
        return data;
      },
    },
    films: {
      type: new GraphQLList(filmType),
      resolve: async (obj, args, { supabase }) => {
        const { data } = await supabase.from('film').select('*');
        return data;
      },
    },
  },
});

export default new GraphQLSchema({ query: queryType });
