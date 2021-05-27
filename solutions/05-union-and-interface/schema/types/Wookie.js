import graphql from 'graphql';
import characterInterface from '../interfaces/Character.js';
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
  } = graphql;

export default new GraphQLObjectType({
    name: 'Wookie',
    interfaces: [characterInterface],
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
      hairColor: {
        type: GraphQLString,
        resolve: (v) => v.hair_color,
      },
    },
  });