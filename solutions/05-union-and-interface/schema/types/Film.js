import graphql from 'graphql';
import Likable, { likableFields } from '../interfaces/Likable.js';
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
  interfaces: () => [Likable],
  fields: () => ({
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
      resolve: async (film, args, { supabase }) => {
        const { data } = await supabase
          .from('planet_featured_in_film')
          .select('planet_id(*)')
          .filter('film_id', 'eq', film.id);
        return data.map((o) => o.planet_id);
      },
    },
    ...likableFields,
  }),
});