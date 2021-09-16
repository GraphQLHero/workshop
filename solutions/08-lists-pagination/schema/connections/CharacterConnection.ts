import { GraphQLInt, GraphQLNonNull } from 'graphql';
import { connectionDefinitions } from 'graphql-relay';
import Character from "../types/Character";

const { connectionType } = connectionDefinitions({
    nodeType: Character,
    connectionFields: () => ({
      totalCount: {
        description: 'Identifies the total count of items in the connection.',
        type: new GraphQLNonNull(GraphQLInt),
      },
    }),
  });

export default connectionType;