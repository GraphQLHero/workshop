import {
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLObjectType,
} from 'graphql';
import spaceshipType from './Spaceship';
import { xWing } from '../../utils/fakeDatabase';

export default new GraphQLObjectType({
  name: 'Droid',
  fields: {
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
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
    favoriteSpaceship: {
      type: spaceshipType,
      resolve: (obj) => {
        if (obj.name === 'r2d2') {
          return xWing;
        }
        return null;
      },
    },
  },
});
