import { graphql } from 'graphql';
import schema from './schema';
import defaultQuery from './queries/defaultQuery';

test('`defaultQuery` resolve correctly', async () => {
  const result = await graphql(schema, defaultQuery);
  expect(result).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "hanSolo": Object {
      "name": "Han Solo",
    },
    "jedis": Array [
      Object {
        "id": "1",
        "isJedi": true,
        "name": "Luke Skywalker",
      },
    ],
    "leiaOrgana": Object {
      "name": "Leia Organa",
    },
    "lukeSkywalker": Object {
      "name": "Luke Skywalker",
    },
    "notJedis": Array [
      Object {
        "id": "2",
        "isJedi": false,
        "name": "Leia Organa",
      },
      Object {
        "id": "3",
        "isJedi": false,
        "name": "Han Solo",
      },
    ],
  },
}
`);
});
