import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLID,
  GraphQLString
} from 'graphql';
import humanGender from '../enums/HumanGender';
import starshipType from './Starship';

export default new GraphQLObjectType({
  name: 'Human',
  fields: {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    gender: {
      type: humanGender
    },
    height: {
      type: GraphQLInt
    },
    mass: {
      type: GraphQLFloat
    },
    avatarUrl: {
      type: GraphQLString,
      resolve: v => v.avatar_url
    },
    isJedi: {
      type: GraphQLBoolean,
      resolve: v => v.is_jedi
    },
    starships: {
      type: new GraphQLList(starshipType),
      resolve: async (obj, args, { supabase }) => {
        const { data } = await supabase
          .from('starship_pilots')
          .select('starship_id(*)')
          .filter('pilot_id', 'eq', obj.id);

        return data.map((o: { starship_id: Object }) => o.starship_id);
      }
    }
  }
});
