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
        "friends": Array [],
        "gender": "MALE",
        "id": "3",
        "likesCount": 0,
        "name": "Han Solo",
        "viewerHasLiked": false,
      },
      Object {
        "friends": Array [],
        "gender": "FEMALE",
        "id": "2",
        "likesCount": 0,
        "name": "Leia Organa",
        "viewerHasLiked": false,
      },
      Object {
        "friends": Array [
          Object {
            "name": "Leia Organa",
          },
          Object {
            "name": "R2-D2",
          },
          Object {
            "name": "Chewbacca",
          },
        ],
        "gender": "MALE",
        "id": "1",
        "likesCount": 8,
        "name": "Luke Skywalker",
        "viewerHasLiked": false,
      },
    ],
    "films": Array [],
    "planets": Array [
      Object {
        "likesCount": 0,
        "name": "Tatooine",
        "viewerHasLiked": false,
      },
      Object {
        "likesCount": 0,
        "name": "Yavin IV",
        "viewerHasLiked": false,
      },
      Object {
        "likesCount": 0,
        "name": "Corellia",
        "viewerHasLiked": false,
      },
      Object {
        "likesCount": 0,
        "name": "Alderaan",
        "viewerHasLiked": false,
      },
      Object {
        "likesCount": 0,
        "name": "Hoth",
        "viewerHasLiked": false,
      },
      Object {
        "likesCount": 0,
        "name": "Naboo",
        "viewerHasLiked": false,
      },
      Object {
        "likesCount": 0,
        "name": "Dagobah",
        "viewerHasLiked": false,
      },
    ],
  },
}
`);
});
