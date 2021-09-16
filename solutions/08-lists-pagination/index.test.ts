import { graphql } from 'graphql';
import schema from './schema';
import defaultQuery from './queries/defaultQuery';

test('`defaultQuery` resolve correctly', async () => {
  const result = await graphql(schema, defaultQuery);
  expect(result).toMatchInlineSnapshot(`
Object {
  "data": null,
  "errors": Array [
    [GraphQLError: Cannot read property 'from' of undefined],
  ],
}
`);
});
