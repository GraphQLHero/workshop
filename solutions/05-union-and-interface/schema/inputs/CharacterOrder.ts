import { GraphQLInputObjectType } from 'graphql';
import OrderDirection from '../enums/OrderDirection';
import CharacterOrderField from '../enums/CharacterOrderField';

export default new GraphQLInputObjectType({
  name: 'CharacterOrder',
  fields: {
    direction: {
      type: OrderDirection
    },
    field: {
      type: CharacterOrderField
    }
  }
});
