import graphql from 'graphql';
import Character from '../interfaces/Character.js';
import characterFriendsResolver from '../../resolvers/characterFriendsResolver.js';
import Likable, { likableFields } from '../interfaces/Likable.js';
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

export default new GraphQLObjectType({
  name: 'Droid',
  interfaces: () => [Character, Likable],
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
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
    friends: {
      type: new GraphQLList(Character),
      resolve: characterFriendsResolver,
    },
    ...likableFields,
  }),
});
