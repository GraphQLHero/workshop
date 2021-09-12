import { GraphQLObjectType, GraphQLList } from 'graphql';
import humanType from './Human';
import viewerType from './Viewer';
import filmType from './Film';
import planetType from './Planet';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: {
      type: viewerType,
      resolve: (obj, args, { viewer }) => {
        return viewer;
      }
    },
    humans: {
      type: new GraphQLList(humanType),
      resolve: async (obj, args, { database }) => {
        const { data } = await database.from('human').select('*');
        return data;
      }
    },
    planets: {
      type: new GraphQLList(planetType),
      resolve: async (obj, args, { database }) => {
        const { data } = await database.from('planet').select('*');
        return data;
      }
    },
    films: {
      type: new GraphQLList(filmType),
      resolve: async (obj, args, { database }) => {
        const { data } = await database.from('film').select('*');
        return data;
      }
    }
  }
});
