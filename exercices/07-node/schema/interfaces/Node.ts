import {
  nodeDefinitions,
  fromGlobalId,
} from 'graphql-relay';
import { leiaOrgana, lukeSkywalker } from '../../utils/fakeDatabase';

 export const { nodeInterface, nodeField } = nodeDefinitions(
  async (globalId: string) => {
    const { type, id } = fromGlobalId(globalId);
    switch (type) {
      case 'Human':
        return [leiaOrgana, lukeSkywalker].find((h) => h.id === id);
    }
  }
);