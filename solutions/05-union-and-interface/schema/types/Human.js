import graphql from 'graphql';
import humanGender from '../enums/HumanGender.js';
import Character from '../interfaces/Character.js';
import Likable, {likableFields} from '../interfaces/Likable.js';
import starshipType from './Starship.js';
import characterFriendsResolver from '../../resolvers/characterFriendsResolver.js';

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLID,
  GraphQLString,
} = graphql;

export default new GraphQLObjectType({
  name: 'Human',
  interfaces: () => ([Character, Likable]),
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    gender: {
      type: humanGender,
    },
    height: {
      type: GraphQLInt,
    },
    mass: {
      type: GraphQLFloat,
    },
    avatarUrl: {
      type: GraphQLString,
      resolve: (v) => v.avatar_url,
    },
    isJedi: {
      type: GraphQLBoolean,
      resolve: (v) => v.is_jedi,
    },
    starships: {
      type: new GraphQLList(starshipType),
      resolve: async (obj, args, { supabase }) => {
        const { data } = await supabase
          .from('starship_pilots')
          .select('starship_id(*)')
          .filter('pilot_id', 'eq', obj.id);
        return data.map((o) => o.starship_id);
      },
    },
    friends: {
      type: new GraphQLList(Character),
      resolve: characterFriendsResolver,
    },
    ...likableFields,
  }),
});
