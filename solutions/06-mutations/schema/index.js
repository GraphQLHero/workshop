import graphql from 'graphql';
import humanType from './types/Human.js';
import droidType from './types/Droid.js';
import wookieType from './types/Wookie.js';
import query from './Query.js';
import mutation from './Mutation.js';

const { GraphQLSchema } = graphql;

export default new GraphQLSchema({
  query,
  mutation,
  types: [humanType, droidType, wookieType],
});
