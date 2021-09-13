import {
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLObjectType
} from 'graphql';
import spaceshipType from './Spaceship';

export default new GraphQLObjectType({
  name: 'Droid',
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
    model: {
      type: GraphQLString
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
