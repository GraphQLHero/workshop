import { GraphQLInputObjectType } from 'graphql';
import OrderDirection from '../enums/OrderDirection';
import HumanOrderField from '../enums/HumanOrderField';

export default new GraphQLInputObjectType({
  name: 'HumanOrder',
  fields: {
    direction: {
      type: OrderDirection
    },
    field: {
      type: HumanOrderField
    }
  }
});
