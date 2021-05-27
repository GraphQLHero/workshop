import graphql from 'graphql';
const { GraphQLEnumType } = graphql;

export default new GraphQLEnumType({
  name: 'HumanOrderField',
  description: 'The possible field for ordering humans.',
  values: {
    MASS: {
      value: 'mass',
    },
    NAME: {
      value: 'name',
    },
  },
});
