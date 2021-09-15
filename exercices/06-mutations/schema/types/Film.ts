import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import Likable, { likableFields } from '../../../06-mutations/schema/interfaces/Likable';
import planetType from './Planet';

export default new GraphQLObjectType({
  name: 'Film',
  interfaces: [Likable],
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
    ...likableFields
  }
});
