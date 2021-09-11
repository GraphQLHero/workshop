import { GraphQLInputObjectType, GraphQLInt } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'DiameterFilter',
  fields: {
    min: {
      type: GraphQLInt,
    },
    max: {
      type: GraphQLInt,
    },
  },
});
