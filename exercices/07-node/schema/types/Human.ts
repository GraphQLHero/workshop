import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../interfaces/Node';

export default new GraphQLObjectType({
  name: 'Human',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('Human'),
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    height: {
      type: GraphQLInt
    },
    mass: {
      type: GraphQLFloat
    },
    avatarUrl: {
      type: GraphQLString,
      resolve: v => v.avatar_url
    },
    isJedi: {
      type: GraphQLBoolean,
      resolve: v => v.is_jedi
    },
  }
});
