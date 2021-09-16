import { graphql } from 'graphql';
import schema from './schema';
import database from './schema';
import defaultQuery from './queries/defaultQuery';

test('`defaultQuery` resolve correctly without viewer', async () => {
  const context = { viewer: null, database };
  const result = await graphql(schema, defaultQuery, null, context);
  expect(result).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "films": Array [],
    "hanSolo": Object {
      "name": "Han Solo",
    },
    "humans": Array [],
    "leiaOrgana": Object {
      "name": "Leia Organa",
    },
    "lukeSkywalker": Object {
      "name": "Luke Skywalker",
    },
    "planets": Array [],
    "viewer": null,
  },
}
`);
});

test('`defaultQuery` resolve correctly with a viewer', async () => {
  const context = { viewer: { username: 'Spyl' }, database };
  const result = await graphql(schema, defaultQuery, null, context);
  expect(result).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "films": Array [],
    "hanSolo": Object {
      "name": "Han Solo",
    },
    "humans": Array [],
    "leiaOrgana": Object {
      "name": "Leia Organa",
    },
    "lukeSkywalker": Object {
      "name": "Luke Skywalker",
    },
    "planets": Array [],
    "viewer": Object {
      "username": "Spyl",
    },
  },
}
`);
});
