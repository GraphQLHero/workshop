import graphql from 'graphql';
const { GraphQLEnumType } = graphql;

export default new GraphQLEnumType({
  name: 'StarWarsSaga',
  description: 'The possible saga for a film.',
  values: {
    ORIGINAL_TRILOGY: {
      value: 'ORIGINAL_TRILOGY',
    },
    PREQUEL_TRILOGY: {
      value: 'PREQUEL_TRILOGY',
    },
    SEQUEL_TRILOGY: {
      value: 'SEQUEL_TRILOGY',
    },
  },
});
