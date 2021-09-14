export default /* GraphQL */ `
  fragment LikableInfos on Likable {
    likesCount
    viewerHasLiked
  }
  {
    characters(orderBy: { field: CREATED_AT, direction: DESC }) {
      id
      name
      friends {
        name
      }
      ...LikableInfos
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
    planets {
      name
      ...LikableInfos
    }
    films {
      title
      ...LikableInfos
    }
  }
`;
