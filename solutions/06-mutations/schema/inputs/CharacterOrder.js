import graphql from 'graphql';
import OrderDirection from '../enums/OrderDirection.js';
import CharacterOrderField from '../enums/CharacterOrderField.js';
const { GraphQLInputObjectType } = graphql;

export default new GraphQLInputObjectType({
  name: 'HumanOrder',
  fields: {
    direction: {
      type: OrderDirection,
    },
    field: {
      type: CharacterOrderField,
    },
  },
});
