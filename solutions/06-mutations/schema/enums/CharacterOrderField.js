import graphql from 'graphql';
const { GraphQLEnumType } = graphql;

export default new GraphQLEnumType({
  name: 'CharacterOrderField',
  description: 'The possible field for ordering characters.',
  values: {
    CREATED_AT: {
      value: 'id',
    },
  },
});
