import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} from 'graphql';
import planetType from './Planet';

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
    },
    featuredPlanets: {
      type: new GraphQLList(planetType),
      resolve: async (film, args, { supabase }) => {
        const { data } = await supabase
          .from('planet_featured_in_film')
          .select('planet_id(*)')
          .filter('film_id', 'eq', film.id);
        return data.map((o: { planet_id: Object }) => o.planet_id);
      }
    }
  }
});
