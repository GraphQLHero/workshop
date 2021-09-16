import { graphql } from 'graphql';
import schema from './schema';
import defaultQuery from './queries/defaultQuery';

test('`defaultQuery` resolve correctly', async () => {
  const result = await graphql(schema, defaultQuery);
  expect(result).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "characters": Object {
      "edges": Array [
        Object {
          "cursor": "YXJyYXljb25uZWN0aW9uOjQ=",
          "node": Object {
            "name": "C-3PO",
          },
        },
        Object {
          "cursor": "YXJyYXljb25uZWN0aW9uOjU=",
          "node": Object {
            "name": "Chewbacca",
          },
        },
        Object {
          "cursor": "YXJyYXljb25uZWN0aW9uOjY=",
          "node": Object {
            "name": "Obi-Wan Kenobi",
          },
        },
      ],
      "pageInfo": Object {
        "endCursor": "YXJyYXljb25uZWN0aW9uOjY=",
        "hasNextPage": true,
        "startCursor": "YXJyYXljb25uZWN0aW9uOjQ=",
      },
    },
  },
}
`);
});
