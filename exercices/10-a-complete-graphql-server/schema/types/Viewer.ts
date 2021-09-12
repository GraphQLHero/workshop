import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    username: {
      type: GraphQLString
    }
  }
});
