import graphql from 'graphql';
const { GraphQLInputObjectType, GraphQLInt } = graphql;

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
