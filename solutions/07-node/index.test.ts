import { graphql } from 'graphql';
import database from './database';
import schema from './schema';
import defaultQuery from './queries/defaultQuery';

test('`defaultQuery` resolve correctly', async () => {
  const context = { viewer: null, database };
  const result = await graphql(schema, defaultQuery, null, context);
  expect(result).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "empireStrikesBack": Object {
      "id": "RmlsbToy",
      "title": "The Empire Strikes Back",
    },
    "leiaOrgana": Object {
      "id": "SHVtYW46Mg==",
      "name": "Leia Organa",
    },
    "lukeSkywalker": Object {
      "id": "SHVtYW46MQ==",
      "name": "Luke Skywalker",
    },
    "newHope": Object {
      "id": "RmlsbTox",
      "title": "A New Hope",
    },
    "nodes": Array [
      Object {
        "id": "SHVtYW46MQ==",
        "name": "Luke Skywalker",
      },
      Object {
        "id": "RmlsbTox",
        "title": "A New Hope",
      },
      Object {
        "id": "SHVtYW46MQ==",
        "name": "Tatooine",
      },
    ],
    "tatooine": Object {
      "id": "SHVtYW46MQ==",
      "name": "Tatooine",
    },
    "yavin": Object {
      "id": "SHVtYW46Mg==",
      "name": "Yavin IV",
    },
  },
}
`);
});
