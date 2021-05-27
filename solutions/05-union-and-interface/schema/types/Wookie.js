import graphql from 'graphql';
import characterInterface from '../interfaces/Character.js';
import characterFriendsResolver from '../../resolvers/characterFriendsResolver.js';

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
  } = graphql;

export default new GraphQLObjectType({
    name: 'Wookie',
    interfaces: () => ([characterInterface]),
    fields: () => ({
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
      friends: {
        type: new GraphQLList(characterInterface),
        resolve: characterFriendsResolver,
      },
    }),
  });