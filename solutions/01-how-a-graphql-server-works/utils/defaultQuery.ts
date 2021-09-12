export default /* GraphQL */ `
  query DefaultQuery {
    lukeSkywalker {
      id
      name
      height
      mass
      avatarUrl
      favoriteSpaceship {
        name
        model
        manufacturer
      }
    }
    leiaOrgana {
      id
      name
      height
      mass
      avatarUrl
      favoriteSpaceship {
        name
        model
        manufacturer
      }
    }
    hanSolo {
      id
      name
      height
      mass
      avatarUrl
      favoriteSpaceship {
        name
        model
        manufacturer
      }
    }
    r2d2 {
      id
      name
      height
      mass
      model
      favoriteSpaceship {
        name
        model
        manufacturer
      }
    }
    chewbacca {
      id
      name
      height
      mass
      hairColor
      favoriteSpaceship {
        name
        model
        manufacturer
      }
    }
  }
`;
