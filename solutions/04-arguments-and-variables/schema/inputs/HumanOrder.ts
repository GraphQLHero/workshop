import { GraphQLInputObjectType } from 'graphql';
import OrderDirection from '../enums/OrderDirection.js';
import HumanOrderField from '../enums/HumanOrderField.js';

export default new GraphQLInputObjectType({
  name: 'HumanOrder',
  fields: {
    direction: {
      type: OrderDirection,
    },
    field: {
      type: HumanOrderField,
    },
  },
});
