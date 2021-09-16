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
    "addLike": Object {
      "likable": Object {
        "id": "1",
        "likesCount": 1,
        "name": "Luke Skywalker",
        "viewerHasLiked": false,
      },
    },
  },
}
`);
});
