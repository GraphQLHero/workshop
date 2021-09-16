import {
  GraphQLObjectType,
} from 'graphql';
import { nodeField, nodesField } from '../interfaces/Node';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    node: nodeField,
    nodes: nodesField,
  }
});
