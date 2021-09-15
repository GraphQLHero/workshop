import {
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull
} from 'graphql';
import Likable, { likableFields } from '../../../06-mutations/schema/interfaces/Likable';

export default new GraphQLObjectType({
  name: 'Droid',
  interfaces: [Likable],
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    height: {
      type: GraphQLInt
    },
    mass: {
      type: GraphQLFloat
    },
    model: {
      type: GraphQLString
    },
    ...likableFields
  }
});
