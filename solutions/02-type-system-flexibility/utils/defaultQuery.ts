export default /* GraphQL */ `
  query DefaultQuery {
    planets {
     name 
    }
    films {
      title
    }
    humans {
      name
      spaceships {
        name
      }
    }
  }
`;