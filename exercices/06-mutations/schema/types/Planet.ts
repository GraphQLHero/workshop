import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import Likable, { likableFields } from '../../../06-mutations/schema/interfaces/Likable';

export default new GraphQLObjectType({
  name: 'Planet',
  interfaces: [Likable],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    diameter: {
      type: GraphQLInt
    },
    ...likableFields
  }
});
