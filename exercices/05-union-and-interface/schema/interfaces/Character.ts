import {
  GraphQLInterfaceType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

export const resolveType = (obj: {gender?: string; model?: string}) => {
  if (obj.gender) {
    return 'Human';
  }
  if (obj.model) {
    return 'Droid';
  }
  return 'Wookie';
};

const characterInterface: GraphQLInterfaceType = new GraphQLInterfaceType({
  name: 'Character',
  resolveType,
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

export default characterInterface;
