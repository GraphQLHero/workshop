import graphql from 'graphql';
const { GraphQLObjectType, GraphQLString } = graphql;

export default new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    username: {
      type: GraphQLString,
    },
  },
});
