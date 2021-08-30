import { GraphQLSchema } from 'graphql';
import queryType from './types/Query';

export default new GraphQLSchema({ query: queryType });
