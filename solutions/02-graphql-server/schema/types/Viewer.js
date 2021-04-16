import graphql from 'graphql';
const { GraphQLObjectType, GraphQLString } = graphql;

/**
 *  type Viewer {
 *    username: String
 *  }
 */
 export default new GraphQLObjectType({
    name: 'Viewer',
    fields: {
      username: {
        type: GraphQLString
      }
    }
  });