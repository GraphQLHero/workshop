import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import {
  GraphQLString,
  GraphQLID,
  GraphQLObjectType,
  GraphQLSchema,
  printSchema,
  graphql
} from 'graphql';

(async () => {
  /**
   *  type Human {
   *    id: ID
   *    name: String
   *  }
   */
  const humanType = new GraphQLObjectType({
    name: 'Human',
    fields: {
      id: {
        type: GraphQLID,
        resolve: obj => {
          console.log(`Resolver called: Human.id with ${JSON.stringify(obj)}`);
          return obj.id;
        }
      },
      name: {
        type: GraphQLString,
        resolve: obj => {
          console.log(
            `Resolver called: Human.name with ${JSON.stringify(obj)}`
          );
          return obj.name;
        }
      }
    }
  });

  /**
   *  type Query {
   *    lukeSkywalker: Human
   *  }
   */
  const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
      lukeSkywalker: {
        type: humanType,
        resolve: () => {
          console.log(`Resolver called: Query.lukeSkywalker`);
          // Our object fetched from our database
          const lukeSkywalker = {
            id: '123',
            name: 'Luke Skywalker'
          };
          return lukeSkywalker;
        }
      }
    }
  });

  // Dump schema in SDL
  const schema = new GraphQLSchema({ query: queryType });
  console.log('Dumping GraphQL schema :\n');
  console.log(printSchema(schema));

  // Test a default query execution
  const defaultQuery = /* GraphQL */ `
    {
      lukeSkywalker {
        id
        name
      }
    }
  `;
  console.log('Executing a test query :\n', defaultQuery, '\n');
  const result = await graphql(schema, defaultQuery);
  console.log('\nExecution result :');
  console.log(JSON.stringify(result, undefined, 2), '\n');

  // Launch HTTP server
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
})();
