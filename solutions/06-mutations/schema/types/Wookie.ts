import {
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLNonNull
} from 'graphql';
import Likable, { likableFields } from '../interfaces/Likable';

export default new GraphQLObjectType({
  name: 'Wookie',
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
    hairColor: {
      type: GraphQLString,
      resolve: (v: { hair_color: string }) => v.hair_color
    },
    ...likableFields
  }
});
