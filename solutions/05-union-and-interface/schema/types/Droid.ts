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

export default new GraphQLObjectType({
  name: 'Droid',
  interfaces: [Character],
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
  }
});
