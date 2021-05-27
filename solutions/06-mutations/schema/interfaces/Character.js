import graphql from 'graphql';
import humanType from '../types/Human.js';
import wookieType from '../types/Wookie.js';
import droidType from '../types/Droid.js';

const {
GraphQLInterfaceType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
} = graphql;

const characterInterface = new GraphQLInterfaceType({
  name: 'Character',
  resolveType: (obj) => {
      if (obj.gender) {
        return humanType;
      }
      if (obj.model) {
        return droidType;
      }
      return wookieType;
  },
  fields: () => ({
      id: {
        type: GraphQLID,
      },
      name: {
        type: GraphQLString,
      },
      friends: {
        type: new GraphQLList(characterInterface),
      },
  }),
});

export default characterInterface;