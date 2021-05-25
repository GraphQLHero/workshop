import graphql from 'graphql';
import planetType from './Planet.js';
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} = graphql;

export default new GraphQLObjectType({
  name: 'Film',
  fields: {
    id: {
      type: GraphQLID,
    },
    title: {
      type: GraphQLString,
    },
    episodeNumber: {
      type: GraphQLInt,
      resolve: (v) => v.episode_number,
    },
    posterUrl: {
      type: GraphQLString,
      resolve: (v) => v.poster_url,
    },
    releaseDate: {
      type: GraphQLString,
      resolve: (v) => v.release_date,
    },
    viewerRating: {
      type: GraphQLInt,
      resolve: (obj, args, context) => {
        if (!context.viewer) return null;
        return 10;
      },
    },
    featuredPlanets: {
      type: new GraphQLList(planetType),
      resolve: async (obj, args, { supabase }) => {
        const { data } = await supabase
          .from('planet')
          .select('*')
          .in('id', ['1', '2', '3']);
        return data;
      },
    },
  },
});
