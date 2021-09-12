import { graphql } from 'graphql';
import schema from './schema';
import defaultQuery from './utils/defaultQuery';

test('`defaultQuery` resolve correctly', () => {
  expect(graphql(schema, defaultQuery)).resolves.toMatchInlineSnapshot(`
    Object {
      "data": Object {
        "humans": Array [
          Object {
            "favoriteSpaceship": Object {
              "name": "X-wing",
            },
            "height": 172,
            "id": "1",
            "mass": 77.1,
            "name": "Luke Skywalker",
          },
          Object {
            "favoriteSpaceship": Object {
              "name": "Tantive IV",
            },
            "height": 150,
            "id": "2",
            "mass": 49.3,
            "name": "Leia Organa",
          },
          Object {
            "favoriteSpaceship": Object {
              "name": "Millennium Falcon",
            },
            "height": 180,
            "id": "3",
            "mass": 80,
            "name": "Han Solo",
          },
        ],
      },
    }
  `);
});
