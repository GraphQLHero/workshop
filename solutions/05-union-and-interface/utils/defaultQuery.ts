export default /* GraphQL */ `
  fragment LikableInfos on Likable {
    likesCount
    viewerHasLiked
  }
  {
    characters(orderBy: { field: CREATED_AT, direction: DESC }) {
      id
      friends {
        name
        ...LikableInfos
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
    search(query: "Tatooine") {
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
