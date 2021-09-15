export default /* GraphQL */ `
  mutation addLikeMutation {
    addLike(input: { likableId: "1"}) {
      likable {
        likesCount
        viewerHasLiked
        ... on Human {
          id
          name
        }
      }
    }
  }
`;
