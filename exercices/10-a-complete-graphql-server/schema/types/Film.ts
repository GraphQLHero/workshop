import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Film',
  fields: {
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
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
    }
  }
});
