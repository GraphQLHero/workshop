import graphql from 'graphql';
import addLikeMutation from './mutations/addLikeMutation.js';
const { GraphQLObjectType } = graphql;

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addLike: addLikeMutation,
  },
});
