export default /* GraphQL */ `
  query DefaultQuery {
    humans {
      id
      name
      height
      mass
      favoriteSpaceship {
        name
      }
    }
  }
`;