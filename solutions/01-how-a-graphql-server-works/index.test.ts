import { graphql } from 'graphql';
import schema from './schema';
import defaultQuery from './queries/defaultQuery';

test('`defaultQuery` resolve correctly', () => {
  expect(graphql(schema, defaultQuery)).resolves.toMatchInlineSnapshot(`
Object {
  "data": Object {
    "chewbacca": Object {
      "favoriteSpaceship": Object {
        "manufacturer": "Corellian Engineering Corporation",
        "model": "YT-1300 light freighter",
        "name": "Millennium Falcon",
      },
      "hairColor": "Brown",
      "height": 228,
      "id": "1",
      "mass": 112,
      "name": "Chewbacca",
    },
    "hanSolo": Object {
      "avatarUrl": "https://graphqlhero.com/img/HanSolo.png",
      "favoriteSpaceship": Object {
        "manufacturer": "Corellian Engineering Corporation",
        "model": "YT-1300 light freighter",
        "name": "Millennium Falcon",
      },
      "height": 180,
      "id": "3",
      "mass": 80,
      "name": "Han Solo",
    },
    "leiaOrgana": Object {
      "avatarUrl": "https://graphqlhero.com/img/LeiaOrgana.png",
      "favoriteSpaceship": Object {
        "manufacturer": "Corporation Technique Corellienne",
        "model": "Corvette CR90",
        "name": "Tantive IV",
      },
      "height": 150,
      "id": "2",
      "mass": 49.3,
      "name": "Leia Organa",
    },
    "lukeSkywalker": Object {
      "avatarUrl": "https://graphqlhero.com/img/luke.jpg",
      "favoriteSpaceship": Object {
        "manufacturer": "Koensayr Manufacturing",
        "model": "BTL Y-wing",
        "name": "X-wing",
      },
      "height": 172,
      "id": "1",
      "mass": 77.1,
      "name": "Luke Skywalker",
    },
    "r2d2": Object {
      "favoriteSpaceship": null,
      "height": 96,
      "id": "1",
      "mass": 32,
      "model": "Série R2",
      "name": "R2-D2",
    },
  },
}
`);
});
