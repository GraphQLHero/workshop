import { graphql } from 'graphql';
import schema from './schema';
import defaultQuery from './utils/defaultQuery';

test('`defaultQuery` resolve correctly', () => {
  expect(graphql(schema, defaultQuery)).resolves.toMatchInlineSnapshot(`
Object {
  "data": Object {
    "films": null,
    "humans": null,
    "planets": null,
  },
  "errors": Array [
    [GraphQLError: Cannot destructure property 'supabase' of 'undefined' as it is undefined.],
    [GraphQLError: Cannot destructure property 'supabase' of 'undefined' as it is undefined.],
    [GraphQLError: Cannot destructure property 'supabase' of 'undefined' as it is undefined.],
  ],
}
`);
});
