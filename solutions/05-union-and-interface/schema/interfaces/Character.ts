import {
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';
import Likable, { likableFields } from './Likable';

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
  interfaces: () => ([Likable]),
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    friends: {
      type: new GraphQLList(characterInterface),
    },
    ...likableFields,
  }),
});

export default characterInterface;
