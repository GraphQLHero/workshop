import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
  name: 'PlanetClimage',
  description: 'The possible climate for a planet.',
  values: {
    ARID: {
      value: 'ARID',
    },
    TEMPERATE: {
      value: 'TEMPERATE',
    },
    TROPICAL: {
      value: 'TROPICAL',
    },
    FROZEN: {
      value: 'FROZEN',
    },
    MURKY: {
      value: 'MURKY',
    },
  },
});
