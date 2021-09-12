import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Planet',
  fields: {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    diameter: {
      type: GraphQLInt
    }
  }
});
