import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../interfaces/Node';

export default new GraphQLObjectType({
  name: 'Film',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('Film'),
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    episodeNumber: {
      type: GraphQLInt,
      resolve: v => v.episode_number
    },
    posterUrl: {
      type: GraphQLString,
      resolve: v => v.poster_url
    },
    releaseDate: {
      type: GraphQLString,
      resolve: v => v.release_date
    },
  }
});
