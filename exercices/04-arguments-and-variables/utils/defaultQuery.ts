export default /* GraphQL */ `
  {
    humans(isJedi: true) {
      id
      name
      gender
    }
    luke: human(id: "123") {
      name
    }
  }
`;
