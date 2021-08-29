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
      strongestJedi: {
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
      strongestDroid: {
        type: droidType,
        resolve: () => findDroidById(1),
      },
      strongestWookie: {
        type: wookieType,
        resolve: () => findWookieById(1),
      },
    },
  });