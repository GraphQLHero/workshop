import { GraphQLSchema } from 'graphql';
import query from './types/Query';
import humanType from './types/Human';
import droidType from './types/Droid';
import wookieType from './types/Wookie';

export default new GraphQLSchema({
  query,
  types: [humanType, droidType, wookieType]
});
