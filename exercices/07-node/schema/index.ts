import { GraphQLSchema } from 'graphql';
import query from './types/Query';
import humanType from './types/Human';

export default new GraphQLSchema({
  query,
  types: [humanType]
});
