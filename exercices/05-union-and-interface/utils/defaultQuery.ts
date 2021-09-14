export default /* GraphQL */ `
  fragment CharacterInfos on Character {
    name
  }
  {
    characters(orderBy: { field: CREATED_AT, direction: DESC }) {
      id
      ...CharacterInfos
      ... on Human {
        gender
      }
      ... on Droid {
        model
      }
      ... on Wookie {
        hairColor
      }
    }
  }
`;
