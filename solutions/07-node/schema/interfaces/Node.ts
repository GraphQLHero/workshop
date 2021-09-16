import { SupabaseClient } from '@supabase/supabase-js';
import {
  nodeDefinitions,
  fromGlobalId,
} from 'graphql-relay';

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
  }
);