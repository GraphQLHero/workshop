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
    "characters": Array [
      Object {
        "hairColor": "Brown",
        "id": "1",
        "name": "Chewbacca",
      },
      Object {
        "hairColor": null,
        "id": "2",
        "name": "C-3PO",
      },
      Object {
        "id": "1",
        "model": "Série R2",
        "name": "R2-D2",
      },
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
