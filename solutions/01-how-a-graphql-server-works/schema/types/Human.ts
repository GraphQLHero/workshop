import {
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLObjectType,
} from 'graphql';
  
export default new GraphQLObjectType({
    name: 'Human',
    fields: {
      id: {
        type: GraphQLID,
      },
      name: {
        type: GraphQLString,
      },
      height: {
        type: GraphQLInt,
      },
      mass: {
        type: GraphQLFloat,
      },
      avatarUrl: {
        type: GraphQLString,
        resolve: (v) => v.avatar_url,
      },
      isJedi: {
        type: GraphQLBoolean,
        resolve: (v) => v.is_jedi,
      },
    },
  });