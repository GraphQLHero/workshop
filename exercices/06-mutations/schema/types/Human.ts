import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import Likable, { likableFields } from '../../../06-mutations/schema/interfaces/Likable';

export default new GraphQLObjectType({
  name: 'Human',
  interfaces: [Likable],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
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
    ...likableFields
  }
});
