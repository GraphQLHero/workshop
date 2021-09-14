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
    "characters": Array [
      Object {
        "gender": "MALE",
        "id": "3",
        "name": "Han Solo",
      },
      Object {
        "gender": "FEMALE",
        "id": "2",
        "name": "Leia Organa",
      },
      Object {
        "gender": "MALE",
        "id": "1",
        "name": "Luke Skywalker",
      },
    ],
  },
}
`);
});
