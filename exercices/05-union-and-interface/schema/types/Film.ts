import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import planetType from './Planet';

export default new GraphQLObjectType({
  name: 'Film',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
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
    featuredPlanets: {
      type: new GraphQLList(planetType),
      resolve: async (film, args, { database }) => {
        const { data } = await database
          .from('planet_featured_in_film')
          .select('planet_id(*)')
          .filter('film_id', 'eq', film.id);
        return data.map((o: { planet_id: Object }) => o.planet_id);
      }
    }
  }
});
