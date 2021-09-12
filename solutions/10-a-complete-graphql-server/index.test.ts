import { graphql } from 'graphql';
import database from './database';
import schema from './schema';
import defaultQuery from './utils/defaultQuery';

test('`defaultQuery` resolve correctly', () => {
  const context = { viewer: null, database};
  expect(graphql(schema, defaultQuery, null, context)).resolves.toMatchInlineSnapshot(`
Object {
  "data": Object {
    "films": null,
    "humans": null,
    "planets": null,
    "viewer": null,
  },
  "errors": Array [
    [GraphQLError: Cannot read property 'viewer' of undefined],
    [GraphQLError: Cannot destructure property 'database' of 'undefined' as it is undefined.],
    [GraphQLError: Cannot destructure property 'database' of 'undefined' as it is undefined.],
    [GraphQLError: Cannot destructure property 'database' of 'undefined' as it is undefined.],
  ],
}
`);
});
