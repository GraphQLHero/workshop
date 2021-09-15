import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Character',
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});