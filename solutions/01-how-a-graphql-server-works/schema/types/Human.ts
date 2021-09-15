import {
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLObjectType
} from 'graphql';
import spaceshipType from './Spaceship';
import { xWing, tantive4, millenniumFalcon } from '../../database';

export default new GraphQLObjectType({
  name: 'Human',
  fields: {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
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
    favoriteSpaceship: {
      type: spaceshipType,
      resolve: obj => {
        if (obj.name === 'Han Solo') {
          return millenniumFalcon;
        }
        if (obj.name === 'Luke Skywalker') {
          return xWing;
        }
        if (obj.name === 'Leia Organa') {
          return tantive4;
        }
      }
    }
  }
});
