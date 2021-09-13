import { GraphQLObjectType, GraphQLList } from 'graphql';
import humanType from './Human';
import viewerType from './Viewer';
import filmType from './Film';
import planetType from './Planet';
import wookieType from './Wookie';
import droidType from './Droid';

import { findDroidById, findHumanById, findWookieById } from '../../database';

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
    r2d2: {
      type: droidType,
      resolve: () => findDroidById(1)
    },
    c3po: {
      type: droidType,
      resolve: () => findDroidById(2)
    },
    chewbacca: {
      type: wookieType,
      resolve: () => findWookieById(1)
    },
    humans: {
      type: new GraphQLList(humanType),
      resolve: async (obj, args, { database }) => {
        // TODO
        return [];
      }
    },
    planets: {
      type: new GraphQLList(planetType),
      resolve: async (obj, args, { database }) => {
        // TODO
        return [];
      }
    },
    films: {
      type: new GraphQLList(filmType),
      resolve: async (obj, args, { database }) => {
        // TODO
        return [];
      }
    }
  }
});
