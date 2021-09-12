import { graphql } from 'graphql';
import schema from './schema';
import defaultQuery from './utils/defaultQuery';

test('`defaultQuery` resolve correctly', () => {
  expect(graphql(schema, defaultQuery)).resolves.toMatchInlineSnapshot(`
Object {
  "errors": Array [
    [GraphQLError: Cannot query field "gender" on type "Human".],
  ],
}
`);
});
