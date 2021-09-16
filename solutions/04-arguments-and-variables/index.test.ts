import { graphql } from 'graphql';
import schema from './schema';
import database from './database';
import defaultQuery from './queries/defaultQuery';

test('`defaultQuery` resolve correctly', async () => {
  const result = await graphql(schema, defaultQuery, null, { database });
  expect(result).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "films": Array [
      Object {
        "title": "The Force Awakens",
      },
    ],
    "humans": Array [
      Object {
        "mass": 80,
        "name": "Han Solo",
      },
      Object {
        "mass": 77.1,
        "name": "Luke Skywalker",
      },
      Object {
        "mass": 49.3,
        "name": "Leia Organa",
      },
    ],
    "planets": Array [
      Object {
        "diameter": 7200,
        "name": "Hoth",
      },
      Object {
        "diameter": 8900,
        "name": "Dagobah",
      },
    ],
  },
}
`);
});
