import { GraphQLObjectType } from 'graphql';
import humanType from './Human';
import droidType from './Droid';
import wookieType from './Wookie';
import {
  lukeSkywalker,
  leiaOrgana,
  hanSolo,
  r2d2,
  c3po,
  chewbacca
} from '../../utils/fakeDatabase';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    lukeSkywalker: {
      type: humanType,
      resolve: () => lukeSkywalker
    },
    leiaOrgana: {
      type: humanType,
      resolve: () => leiaOrgana
    },
    hanSolo: {
      type: humanType,
      resolve: () => hanSolo
    },
    r2d2: {
      type: droidType,
      resolve: () => r2d2
    },
    c3po: {
      type: droidType,
      resolve: () => c3po
    },
    chewbacca: {
      type: wookieType,
      resolve: () => chewbacca
    }
  }
});
