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

export default new GraphQLObjectType({
  name: 'Wookie',
  interfaces: [Character],
  fields: {
    id: {
      type: GraphQLID
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
      resolve: (v: {hair_color: string}) => v.hair_color
    },
    friends: {
      type: new GraphQLList(Character),
      resolve: characterFriendsResolver,
    },
  }
});
