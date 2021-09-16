import {
  GraphQLFieldConfigMap,
  GraphQLInterfaceType,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql';

export const likableFields: GraphQLFieldConfigMap<
  any,
  { viewer: Object | null }
> = {
  likesCount: {
    type: GraphQLInt,
    resolve: obj => obj.likes_count
  },
  viewerHasLiked: {
    type: GraphQLBoolean,
    resolve: (obj, args, { viewer }) => {
      if (viewer) {
        return true;
      }
      return false;
    }
  }
};

export default new GraphQLInterfaceType({
  name: 'Likable',
  resolveType: (obj: {title?: string; diameter?: number; gender?: string; model?: string}) => {
    if (obj.title) {
      return 'Film';
    }
    if (obj.diameter) {
      return 'Planet';
    }
    if (obj.gender) {
      return 'Human';
    }
    if (obj.model) {
      return 'Droid';
    }
    return 'Wookie';
  },
  fields: () => likableFields
});
