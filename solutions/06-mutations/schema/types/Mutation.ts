import { GraphQLObjectType } from 'graphql';
import addLikeMutation from '../mutations/addLikeMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addLike: addLikeMutation,
  },
});
