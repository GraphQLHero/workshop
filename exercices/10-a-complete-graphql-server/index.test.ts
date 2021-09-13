import { graphql } from 'graphql';
import schema from './schema';
import defaultQuery from './utils/defaultQuery';

test('`defaultQuery` resolve correctly', async () => {
  expect(graphql(schema, defaultQuery)).resolves.toMatchInlineSnapshot(`
Object {
  ],
}
`);
});
