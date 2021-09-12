import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString
} from 'graphql';
// import humanType from './Human';

export default new GraphQLObjectType({
  name: 'Starship',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    model: {
      type: GraphQLString
    }
    // pilots: {
    //   type: new GraphQLList(humanType),
    //   resolve: async (obj, args, { supabase }) => {
    //     const { data } = await supabase
    //       .from('starship_pilots')
    //       .select('pilot_id(*)')
    //       .filter('starship_id', 'eq', obj.id);
    //     return data.map((o) => o.pilot_id);
    //   },
    // },
  })
});
