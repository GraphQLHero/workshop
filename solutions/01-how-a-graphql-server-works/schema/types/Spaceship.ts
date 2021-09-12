import { GraphQLString, GraphQLID, GraphQLObjectType } from 'graphql';

export default new GraphQLObjectType({
  name: 'Spaceship',
  fields: {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    model: {
      type: GraphQLString
    },
    manufacturer: {
      type: GraphQLString
    }
  }
});
