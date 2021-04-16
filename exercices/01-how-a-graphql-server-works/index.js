import express from 'express';
import expressGraphQL from 'express-graphql';
import graphql from 'graphql';
const {
  GraphQLString, // Le type scalaire `String` en SDL
  GraphQLID, // Le type scalaire `ID` en SDL
  GraphQLObjectType, // Le type objet en SDL
  GraphQLSchema, // Pour construire notre schéma
  printSchema, // Pour afficher le schéma en SDL
  graphqlSync,
} = graphql;

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
      resolve: (obj) => {
        console.log('Resolver called: Human.id');
        return obj.id;
      },
    },
    name: {
      type: GraphQLString,
      resolve: (obj) => {
        console.log('Resolver called: Human.name');
        return obj.name;
      },
    },
  },
});

/**
 *  type Query {
 *    strongestJedi: Human
 *  }
 */
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    strongestJedi: {
      type: humanType,
      resolve: () => {
        console.log('Resolver called: Query.strongestJedi');
        // Our object fetched from our database
        const lukeSkywalker = {
          id: '123',
          name: 'Luke Skywalker',
        };
        return lukeSkywalker;
      },
    },
  },
});

const schema = new GraphQLSchema({ query: queryType });

console.log('Dumping GraphQL schema :\n');
console.log(printSchema(schema));

const query = `{
  strongestJedi {
    id
    name
  }
}
`;

console.log('Executing a test query :\n', query, '\n');

const result = graphqlSync(schema, query);
console.log('\nExecution result :');
console.log(JSON.stringify(result, null, true), '\n');

const { graphqlHTTP } = expressGraphQL;

var app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: {
      defaultQuery: query,
    },
  })
);
app.use('/', (req, res) => {
  res.redirect('/graphql');
});
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
