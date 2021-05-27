import graphql from 'graphql';
const {
GraphQLInterfaceType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
} = graphql;

const characterInterface = new GraphQLInterfaceType({
  name: 'Character',
  fields: () => ({
      id: {
        type: GraphQLID,
      },
      name: {
        type: GraphQLString,
      },
      // friends: {
      //   type: new GraphQLList(characterInterface),
      //   resolve: async (obj, args, { supabase }) => {
      //   //   const { data } = await supabase
      //   //     .from('starship_pilots')
      //   //     .select('starship_id(*)')
      //   //     .filter('pilot_id', 'eq', obj.id);
      //   //   return data.map((o) => o.starship_id);
      //   },
      // },
  }),
});

export default characterInterface;