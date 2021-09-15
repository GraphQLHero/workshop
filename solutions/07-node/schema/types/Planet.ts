import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../interfaces/Node';

export default new GraphQLObjectType({
  name: 'Planet',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('Human'),
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    diameter: {
      type: GraphQLInt
    },
  }
});
