import {
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import characterFriendsResolver from '../../resolvers/characterFriendsResolver';
import Character from '../interfaces/Character';
import Likable, { likableFields } from '../interfaces/Likable';

export default new GraphQLObjectType({
  name: 'Wookie',
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
    hairColor: {
      type: GraphQLString,
      resolve: (v: { hair_color: string }) => v.hair_color
    },
    friends: {
      type: new GraphQLList(Character),
      resolve: characterFriendsResolver
    },
    ...likableFields
  }
});
