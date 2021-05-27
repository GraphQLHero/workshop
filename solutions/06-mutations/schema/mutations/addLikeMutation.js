import graphql from 'graphql';
import graphqlRelay from 'graphql-relay';
import Likable from '../interfaces/Likable.js';
const {
    GraphQLID,
    GraphQLNonNull,
} = graphql;
const { mutationWithClientMutationId } = graphqlRelay;

// For now we only support humans.
const findLikable = async (likableId, supabase) => {
    const { data: human } = await supabase
    .from('human')
    .select('*')
    .eq('id', likableId)
    .single();

    return human || null;
}

export default mutationWithClientMutationId({
    name: 'AddLike',
    description: 'Adds a like to a `Likable`.',
    inputFields: {
      likableId: {
        type: new GraphQLNonNull(GraphQLID),
      },
    },
    outputFields: {
      likable: {
        type: Likable,
      },
    },
    mutateAndGetPayload: async (input, {supabase}) => {
      const { likableId } = input;

      const likable = await findLikable(likableId, supabase);
      if (!likable) return { likable: null };

      // For now we only support humans.
      const { data } = await supabase
        .from('human')
        .update({ likes_count: likable.likes_count +1 })
        .match({ id: likableId })
        .single();


      return {
        likable: data,
      };
    },
  });