import { graphql } from 'graphql';
import schema from './schema';
import defaultQuery from './utils/defaultQuery';

test('`defaultQuery` resolve correctly', async () => {
  const result = await graphql(schema, defaultQuery);
  expect(result).toMatchInlineSnapshot(`
Object {
  "data": Object {
    "leiaOrgana": null,
    "lukeSkywalker": null,
  },
  "errors": Array [
    [GraphQLError: Abstract type "Node" must resolve to an Object type at runtime for field "Query.node". Either the "Node" type should provide a "resolveType" function or each possible type should provide an "isTypeOf" function.],
    [GraphQLError: Abstract type "Node" must resolve to an Object type at runtime for field "Query.node". Either the "Node" type should provide a "resolveType" function or each possible type should provide an "isTypeOf" function.],
  ],
}
`);
});
