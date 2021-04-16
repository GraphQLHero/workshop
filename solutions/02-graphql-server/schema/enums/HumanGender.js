import graphql from 'graphql';
const { GraphQLEnumType } = graphql;

export default new GraphQLEnumType({
    name: 'HumanGender',
    description: 'The possible gender for a human.',
    values: {
      FEMALE: {
        value: 'FEMALE'
      },
      MALE: {
        value: 'MALE'
      },
      OTHER: {
        value: 'OTHER'
      }
    }
  });