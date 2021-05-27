import graphql from 'graphql';
import humanType from '../types/Human.js';
import wookieType from '../types/Wookie.js';
import droidType from '../types/Droid.js';
import Likable, { likableFields } from './Likable.js';

const {
GraphQLInterfaceType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
} = graphql;

export const resolveType = (obj) => {
  if (obj.gender) {
    return humanType;
  }
  if (obj.model) {
    return droidType;
  }
  return wookieType;
}

const characterInterface = new GraphQLInterfaceType({
  name: 'Character',
  resolveType,
  interfaces: [Likable],
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