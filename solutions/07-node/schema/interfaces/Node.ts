import { SupabaseClient } from '@supabase/supabase-js';
import {
  nodeDefinitions,
  fromGlobalId,
} from 'graphql-relay';

/**
 * We get the node interface and field from the relay library.
 *
 * The first method is the way we resolve an ID to its object.
 * The second is the way we resolve an object that implements node to its type.
 */
 export const { nodeInterface, nodeField, nodesField } = nodeDefinitions<{database : SupabaseClient}>(
  async (globalId: string, {database}) => {
    const { type, id } = fromGlobalId(globalId);
    switch (type) {
      case 'Human':
        const { data: human } = await database
          .from('human')
          .select('*')
          .eq('id', id)
          .single();
        if (!human) return null;
        return { ...human, __typename: 'Human' };
      case 'Film':
        const { data: film } = await database
          .from('film')
          .select('*')
          .eq('id', id)
          .single();
        if (!film) return null;
        return { ...film, __typename: 'Film' };
      case 'Planet':
        const { data: planet } = await database
          .from('planet')
          .select('*')
          .eq('id', id)
          .single();
        if (!planet) return null;
        return { ...planet, __typename: 'Planet' };
    }
  },
  // (obj) => {
  //   switch (obj.__typename) {
  //     case 'Human':
  //       return humanType;
  //     case 'Film':
  //       return filmType;
  //     case 'Planet':
  //       return planetType;
  //   }
  // }
);