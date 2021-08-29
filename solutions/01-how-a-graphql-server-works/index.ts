import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';

(async () => {
  const defaultQuery = /* GraphQL */`
query DefaultQuery {
  strongestJedi {
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
  strongestDroid {
    id
    name
    height
    mass
    model
  }
  strongestWookie {
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

})();