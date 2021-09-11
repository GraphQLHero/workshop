import { graphql } from 'graphql';
import schema from './schema';
import defaultQuery from './defaultQuery';

test('`defaultQuery` resolve correctly', () => {
  expect(graphql(schema, defaultQuery)).resolves.toMatchInlineSnapshot(`
    Object {
      "data": Object {
        "films": Array [
          Object {
            "title": "A New Hope",
          },
          Object {
            "title": "The Empire Strikes Back",
          },
          Object {
            "title": "Return of the Jedi",
          },
          Object {
            "title": "Revenge of the Sith",
          },
          Object {
            "title": "The Force Awakens",
          },
          Object {
            "title": "The Phantom Menace",
          },
          Object {
            "title": "Attack of the Clones",
          },
        ],
        "humans": Array [
          Object {
            "name": "Luke Skywalker",
            "spaceships": Array [
              Object {
                "name": "X-wing",
              },
            ],
          },
          Object {
            "name": "Leia Organa",
            "spaceships": Array [
              Object {
                "name": "Tantive IV",
              },
            ],
          },
          Object {
            "name": "Han Solo",
            "spaceships": Array [
              Object {
                "name": "Millennium Falcon",
              },
            ],
          },
        ],
        "planets": Array [
          Object {
            "name": "Tatooine",
          },
          Object {
            "name": "Yavin IV",
          },
          Object {
            "name": "Corellia",
          },
          Object {
            "name": "Alderaan",
          },
          Object {
            "name": "Hoth",
          },
          Object {
            "name": "Naboo",
          },
          Object {
            "name": "Dagobah",
          },
        ],
      },
    }
  `);
});
