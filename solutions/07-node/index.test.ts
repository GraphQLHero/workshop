import { graphql } from 'graphql';
import database from './database';
import schema from './schema';
import defaultQuery from './utils/defaultQuery';

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
  },
}
`);
});
