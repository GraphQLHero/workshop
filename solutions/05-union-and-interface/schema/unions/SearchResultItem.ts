import graphql from 'graphql';
import humanType from '../types/Human.js';
import wookieType from '../types/Wookie.js';
import droidType from '../types/Droid.js';
import filmType from '../types/Film.js';
import planetType from '../types/Planet.js';
const { GraphQLUnionType } = graphql;

export default new GraphQLUnionType({
  name: 'SearchResultItem',
  types: () => [humanType, droidType, wookieType, filmType, planetType],
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
});
