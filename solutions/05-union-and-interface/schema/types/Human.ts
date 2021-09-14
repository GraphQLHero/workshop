import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import humanGender from '../enums/HumanGender';
import characterFriendsResolver from '../../resolvers/characterFriendsResolver';
import Character from '../interfaces/Character';
import Likable, { likableFields } from '../interfaces/Likable';

export default new GraphQLObjectType({
  name: 'Human',
  interfaces: [Character, Likable],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    gender: {
      type: humanGender
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
    friends: {
      type: new GraphQLList(Character),
      resolve: characterFriendsResolver,
    },
    ...likableFields
  }
});
