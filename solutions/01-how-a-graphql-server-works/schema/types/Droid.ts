import {
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLFloat,
    GraphQLObjectType,
} from 'graphql';

export default new GraphQLObjectType({
    name: 'Droid',
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
      model: {
        type: GraphQLString,
      },
    },
  });