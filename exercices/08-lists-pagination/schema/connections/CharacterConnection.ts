import { connectionDefinitions } from 'graphql-relay';
import Character from "../types/Character";

const { connectionType } = connectionDefinitions({
    nodeType: Character,
    connectionFields: () => ({
      // Here, you can add some connection fields
    }),
  });

export default connectionType;