export default /* GraphQL */ `
  {
        humans(orderBy: {field: MASS, direction: DESC}) {
          name
          mass
        }
        films(saga: SEQUEL_TRILOGY) {
          title
        }
        planets(diameter: {min: 500, max: 10000}) {
          name
          diameter
        }
      }
`;