import { offsetToCursor } from "graphql-relay";

export default /* GraphQL */ `{
  characters(first: 3, after: "${offsetToCursor(3)}") {
    edges {
      cursor
      node {
        name
      }
    }
    pageInfo {
      hasNextPage
      endCursor
      startCursor
    }
  }
}`