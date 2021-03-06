import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import planetClimage from '../enums/PlanetClimate';
import planetLandscape from '../enums/PlanetLandscape';
import Likable, { likableFields } from '../interfaces/Likable';

export default new GraphQLObjectType({
  name: 'Planet',
  interfaces: [Likable],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    diameter: {
      type: GraphQLInt
    },
    climate: {
      type: planetClimage
    },
    landscapes: {
      type: new GraphQLList(planetLandscape),
      resolve: () => {
        return (
          [
            'DESERT',
            'GRASSLANDS',
            'FORESTS',
            'JUNGLE',
            'LAKES',
            'TUNDRA',
            'MOUNTAINS'
          ]
            // .sort(() => 0.5 - Math.random())
            .slice(0, 2)
        );
      }
    },
    ...likableFields
  }
});
