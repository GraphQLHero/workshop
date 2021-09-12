import {
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';
import spaceshipType from './Spaceship';

export default new GraphQLObjectType({
  name: 'Human',
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
    avatarUrl: {
      type: GraphQLString,
      resolve: (v) => v.avatar_url,
    },
    isJedi: {
      type: GraphQLBoolean,
      resolve: (v) => v.is_jedi,
    },
    spaceships: {
      type: new GraphQLList(spaceshipType),
      resolve: (obj) => {
        // TODO
      },
    },
    favoriteSpaceship: {
      type: spaceshipType,
      resolve: (obj) => {
        // TODO
      },
    },
  },
});
