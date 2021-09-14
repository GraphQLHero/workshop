import {
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull
} from 'graphql';
import characterFriendsResolver from '../../resolvers/characterFriendsResolver';
import Character from '../interfaces/Character';
import Likable, { likableFields } from '../interfaces/Likable';

export default new GraphQLObjectType({
  name: 'Droid',
  interfaces: [Character, Likable],
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
    model: {
      type: GraphQLString
    },
    friends: {
      type: new GraphQLList(Character),
      resolve: characterFriendsResolver,
    },
    ...likableFields,
  }
});
