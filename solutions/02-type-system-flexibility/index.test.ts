import { graphql } from 'graphql';
import schema from './schema';
import defaultQuery from './queries/defaultQuery';

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
        "appearsIn": Array [
          Object {
            "featuredHumans": Array [
              Object {
                "name": "Luke Skywalker",
              },
              Object {
                "name": "Leia Organa",
              },
              Object {
                "name": "Han Solo",
              },
            ],
            "featuredPlanets": Array [
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
            "title": "A New Hope",
          },
          Object {
            "featuredHumans": Array [
              Object {
                "name": "Luke Skywalker",
              },
              Object {
                "name": "Leia Organa",
              },
              Object {
                "name": "Han Solo",
              },
            ],
            "featuredPlanets": Array [
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
            "title": "The Empire Strikes Back",
          },
          Object {
            "featuredHumans": Array [
              Object {
                "name": "Luke Skywalker",
              },
              Object {
                "name": "Leia Organa",
              },
              Object {
                "name": "Han Solo",
              },
            ],
            "featuredPlanets": Array [
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
            "title": "Return of the Jedi",
          },
        ],
        "name": "Luke Skywalker",
        "spaceships": Array [
          Object {
            "name": "X-wing",
          },
        ],
      },
      Object {
        "appearsIn": Array [
          Object {
            "featuredHumans": Array [
              Object {
                "name": "Luke Skywalker",
              },
              Object {
                "name": "Leia Organa",
              },
              Object {
                "name": "Han Solo",
              },
            ],
            "featuredPlanets": Array [
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
            "title": "A New Hope",
          },
          Object {
            "featuredHumans": Array [
              Object {
                "name": "Luke Skywalker",
              },
              Object {
                "name": "Leia Organa",
              },
              Object {
                "name": "Han Solo",
              },
            ],
            "featuredPlanets": Array [
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
            "title": "The Empire Strikes Back",
          },
        ],
        "name": "Leia Organa",
        "spaceships": Array [
          Object {
            "name": "Tantive IV",
          },
        ],
      },
      Object {
        "appearsIn": Array [
          Object {
            "featuredHumans": Array [
              Object {
                "name": "Luke Skywalker",
              },
              Object {
                "name": "Leia Organa",
              },
              Object {
                "name": "Han Solo",
              },
            ],
            "featuredPlanets": Array [
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
            "title": "A New Hope",
          },
        ],
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
        "climate": "ARID",
        "landscapes": Array [
          "DESERT",
          "GRASSLANDS",
        ],
        "name": "Tatooine",
      },
      Object {
        "climate": "TEMPERATE",
        "landscapes": Array [
          "DESERT",
          "GRASSLANDS",
        ],
        "name": "Yavin IV",
      },
      Object {
        "climate": "TEMPERATE",
        "landscapes": Array [
          "DESERT",
          "GRASSLANDS",
        ],
        "name": "Corellia",
      },
      Object {
        "climate": "TEMPERATE",
        "landscapes": Array [
          "DESERT",
          "GRASSLANDS",
        ],
        "name": "Alderaan",
      },
      Object {
        "climate": "FROZEN",
        "landscapes": Array [
          "DESERT",
          "GRASSLANDS",
        ],
        "name": "Hoth",
      },
      Object {
        "climate": "TEMPERATE",
        "landscapes": Array [
          "DESERT",
          "GRASSLANDS",
        ],
        "name": "Naboo",
      },
      Object {
        "climate": "MURKY",
        "landscapes": Array [
          "DESERT",
          "GRASSLANDS",
        ],
        "name": "Dagobah",
      },
    ],
  },
}
`);
});
