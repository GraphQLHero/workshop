import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
  name: 'PlanetLandscape',
  description: 'The possible landscape for a planet.',
  values: {
    DESERT: {
      value: 'DESERT',
    },
    GRASSLANDS: {
      value: 'GRASSLANDS',
    },
    MOUNTAINS: {
      value: 'MOUNTAINS',
    },
    JUNGLE: {
      value: 'JUNGLE',
    },
    RAINFORESTS: {
      value: 'RAINFORESTS',
    },
    FORESTS: {
      value: 'FORESTS',
    },
    LAKES: {
      value: 'LAKES',
    },
    TUNDRA: {
      value: 'TUNDRA',
    },
  },
});
