import { GraphQLUnionType } from 'graphql';
import humanType from '../types/Human';
import wookieType from '../types/Wookie';
import droidType from '../types/Droid';
import filmType from '../types/Film';
import planetType from '../types/Planet';

export default new GraphQLUnionType({
  name: 'SearchResultItem',
  types: () => [humanType, droidType, wookieType, filmType, planetType],
  resolveType: obj => {
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
  }
});
