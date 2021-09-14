import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLString
} from 'graphql';
import planetType from './Planet';
import { alderaan, corellia, dagobah, hanSolo, hoth, leiaOrgana, lukeSkywalker, naboo, tatooine, yavin } from '../../utils/fakeDatabase';

export default new GraphQLObjectType({
  name: 'Film',
  fields: () => {
    const humanType = require('./Human').default;
    return {
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
    featuredHumans: {
      type: new GraphQLList(humanType),
      resolve: () => [
        lukeSkywalker,
        leiaOrgana,
        hanSolo,
      ]
    },
      featuredPlanets: {
      type: new GraphQLList(planetType),
      resolve: () => [tatooine, yavin, corellia, alderaan, hoth, naboo, dagobah]
    }
  }}
});