import { SupabaseClient } from '@supabase/supabase-js';
import { GraphQLFieldConfig, GraphQLID, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import Likable from '../interfaces/Likable';

const findLikable = async (likableId: string, database: SupabaseClient) => {
  const { data: human } = await database
    .from('human')
    .select('*')
    .eq('id', likableId)
    .single();

  return human || null;
};

const addLikeMutation: GraphQLFieldConfig<any, { database: SupabaseClient}> = mutationWithClientMutationId({
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
  mutateAndGetPayload: async (input, { database }) => {
    const { likableId } = input;

    const likable = await findLikable(likableId, database);
    if (!likable) return { likable: null };

    // For now we only support humans.
    const { data } = await database
      .from('human')
      .update({ likes_count: likable.likes_count + 1 })
      .match({ id: likableId })
      .single();

    return {
      likable: data,
    };
  },
});

export default addLikeMutation;