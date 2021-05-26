import graphql from 'graphql';
import humanGender from '../enums/HumanGender.js';
import starshipType from './Starship.js';
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } = graphql;

export default new GraphQLObjectType({
  name: 'Human',
  fields: {
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    gender: {
      type: humanGender,
    },
    starships: {
      type: new GraphQLList(starshipType),
      resolve: async (obj, args, { supabase }) => {
        const { data } = await supabase
          .from('starship_pilots')
          .select('starship_id(*)')
          .filter('pilot_id', 'eq', obj.id);
        return data.map(o => o.starship_id);
    },
  },
  },
});
