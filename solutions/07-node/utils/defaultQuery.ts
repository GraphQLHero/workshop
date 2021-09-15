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
  newHope: node(id: "${toGlobalId('Film', '1')}") {
    id
    ... on Film {
      title
    }
  }
  empireStrikesBack: node(id: "${toGlobalId('Film', '2')}") {
    id
    ... on Film {
      title
    }
  }
  tatooine: node(id: "${toGlobalId('Planet', '1')}") {
    id
    ... on Planet {
      name
    }
  }
  yavin: node(id: "${toGlobalId('Planet', '2')}") {
    id
    ... on Planet {
      name
    }
  }
  nodes(ids: ["${toGlobalId('Human', '1')}", "${toGlobalId('Film', '1')}","${toGlobalId('Planet', '1')}"]) {
    id
    ... on Human {
      name
    }
    ... on Film {
      title
    }
    ... on Planet {
      name
    }
  }
}`