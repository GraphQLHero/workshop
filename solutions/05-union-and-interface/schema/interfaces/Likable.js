import graphql from 'graphql';
import humanType from '../types/Human.js';
import wookieType from '../types/Wookie.js';
import droidType from '../types/Droid.js';
import planetType from '../types/Planet.js';
import filmType from '../types/Film.js';

const { GraphQLInterfaceType, GraphQLInt, GraphQLBoolean } = graphql;

export const likableFields = {
  likesCount: {
    type: GraphQLInt,
    resolve: (obj) => obj.likes_count,
  },
  viewerHasLiked: {
    type: GraphQLBoolean,
    resolve: (obj, args, { viewer }) => {
      if (viewer) {
        return true;
      }
      return false;
    },
  },
};

export default new GraphQLInterfaceType({
  name: 'Likable',
  resolveType: (obj) => {
    if (obj.title) {
      return filmType;
    }
    if (obj.diameter) {
      return planetType;
    }
    if (obj.gender) {
      return humanType;
    }
    if (obj.model) {
      return droidType;
    }
    return wookieType;
  },
  fields: () => likableFields,
});
