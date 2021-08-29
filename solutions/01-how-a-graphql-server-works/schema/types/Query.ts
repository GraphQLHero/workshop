import {
    GraphQLObjectType,
} from 'graphql';
import humanType from './Human';
import droidType from './Droid';
import wookieType from './Wookie';
import { findHumanById, findDroidById, findWookieById } from '../../database';
  
export default new GraphQLObjectType({
    name: 'Query',
    fields: {
      lukeSkywalker: {
        type: humanType,
        resolve: () => findHumanById(1),
      },
      leiaOrgana: {
        type: humanType,
        resolve: () => findHumanById(2),
      },
      hanSolo: {
        type: humanType,
        resolve: () => findHumanById(3),
      },
      r2d2: {
        type: droidType,
        resolve: () => findDroidById(1),
      },
      c3po: {
        type: droidType,
        resolve: () => findDroidById(2),
      },
      chewbacca: {
        type: wookieType,
        resolve: () => findWookieById(1),
      },
    },
  });