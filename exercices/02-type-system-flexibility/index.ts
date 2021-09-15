import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';
import defaultQuery from './queries/defaultQuery';

var app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: {
      defaultQuery
    }
  })
);
app.use('/', (_, res) => {
  res.redirect('/graphql');
});
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
