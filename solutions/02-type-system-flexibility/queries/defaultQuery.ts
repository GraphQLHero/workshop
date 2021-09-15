export default /* GraphQL */ `
  query DefaultQuery {
    planets {
      name
      climate
      landscapes
    }
    films {
      title
    }
    humans {
      name
      appearsIn {
        title
        featuredPlanets {
          name
        }
        featuredHumans {
          name
        }
      }
      spaceships {
        name
      }
    }
  }
`;
