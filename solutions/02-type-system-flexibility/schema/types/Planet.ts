import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';
import planetClimage from '../enums/PlanetClimate';
import planetLandscape from '../enums/PlanetLandscape';

export default new GraphQLObjectType({
  name: 'Planet',
  fields: {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
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
    }
  }
});
