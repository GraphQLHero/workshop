export default /* GraphQL */ `
  {
    jedis: humans(isJedi: true) {
      id
      name
      isJedi
    }
    notJedis: humans(isJedi: false) {
      id
      name
      isJedi
    }
    lukeSkywalker: human(id: 1) {
      name
    }
    leiaOrgana: human(id: 2) {
      name
    }
    hanSolo: human(id: 3) {
      name
    }
  }
`;
