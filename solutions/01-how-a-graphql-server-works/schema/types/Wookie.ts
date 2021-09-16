import {
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLObjectType
} from 'graphql';
import spaceshipType from './Spaceship';
import { millenniumFalcon } from '../../database';

export default new GraphQLObjectType({
  name: 'Wookie',
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
    hairColor: {
      type: GraphQLString,
      resolve: v => v.hair_color
    },
    favoriteSpaceship: {
      type: spaceshipType,
      resolve: obj => {
        return millenniumFalcon;
      }
    }
  }
});
