import { GraphQLObjectType, GraphQLList } from 'graphql';
import humanType from './Human';
import viewerType from './Viewer';
import filmType from './Film';
import planetType from './Planet';
import { findHumanById } from '../../database';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: {
      type: viewerType,
      resolve: (obj, args, { viewer }) => {
        return viewer;
      }
    },
    lukeSkywalker: {
      type: humanType,
      resolve: () => findHumanById(1)
    },
    leiaOrgana: {
      type: humanType,
      resolve: () => findHumanById(2)
    },
    hanSolo: {
      type: humanType,
      resolve: () => findHumanById(3)
    },
    // r2d2: {
    //   type: droidType,
    //   resolve: () => findDroidById(1)
    // },
    // c3po: {
    //   type: droidType,
    //   resolve: () => findDroidById(2)
    // },
    // chewbacca: {
    //   type: wookieType,
    //   resolve: () => findWookieById(1)
    // },
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
