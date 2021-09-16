import { toGlobalId } from "graphql-relay";

export default /* GraphQL */ `{
  lukeSkywalker: node(id: "${toGlobalId('Human', '1')}") {
    id
    ... on Human {
      name
    }
  }
  leiaOrgana: node(id: "${toGlobalId('Human', '2')}") {
    id
    ... on Human {
      name
    }
  }
}`