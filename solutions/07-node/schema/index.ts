import { GraphQLSchema } from 'graphql';
import query from './types/Query';
import humanType from './types/Human';
import filmType from './types/Film';
import planetType from './types/Planet';

export default new GraphQLSchema({
  query,
  types: [humanType, filmType, planetType]
});
