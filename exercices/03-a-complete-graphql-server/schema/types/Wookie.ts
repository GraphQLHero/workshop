import {
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLObjectType
} from 'graphql';
import spaceshipType from './Spaceship';

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
        // TODO
        return null;
      }
    }
  }
});
