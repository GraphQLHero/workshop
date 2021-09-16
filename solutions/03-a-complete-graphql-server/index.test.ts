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
        "id": "1",
        "name": "Luke Skywalker",
      },
      Object {
        "id": "2",
        "name": "Leia Organa",
      },
      Object {
        "id": "3",
        "name": "Han Solo",
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
    "viewer": null,
  },
}
`);
});
