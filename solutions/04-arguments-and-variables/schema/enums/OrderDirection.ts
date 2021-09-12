import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
  name: 'OrderDirection',
  description: 'The possible direction for ordering.',
  values: {
    ASC: {
      value: 'ASC'
    },
    DESC: {
      value: 'DESC'
    }
  }
});
