import { GraphQLSchema } from 'graphql';
import query from './types/Query';
import humanType from './types/Human';
import droidType from './types/Droid';
import wookieType from './types/Wookie';
import mutation from './types/Mutation';

export default new GraphQLSchema({
  query,
  mutation,
  types: [humanType, droidType, wookieType]
});
