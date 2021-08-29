import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';

  const defaultQuery = /* GraphQL */`
query DefaultQuery {
  lukeSkywalker {
    id
    name
    height
    mass
    avatarUrl
  }
  leiaOrgana {
    name
  }
  hanSolo {
    name
  }
  r2d2 {
    id
    name
    height
    mass
    model
  }
  chewbacca {
    id
    name
    height
    mass
    hairColor
  }
}
`;

var app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: {
      defaultQuery
    },
  })
);
app.use('/', (_, res) => {
  res.redirect('/graphql');
});
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');