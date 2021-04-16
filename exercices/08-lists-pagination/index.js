import express from 'express';
import expressGraphQL from 'express-graphql';
import graphql from 'graphql';
import graphqlRelay from 'graphql-relay';

const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  printSchema,
  graphqlSync,
} = graphql;
const {
  connectionDefinitions,
  offsetToCursor,
  connectionFromArray,
  forwardConnectionArgs,
} = graphqlRelay;

// Our objects fetched from our database
const lukeSkywalker = {
  name: 'Luke Skywalker',
};
const leiaOrgana = {
  name: 'Leia Organa',
};
const darthVader = {
  name: 'Anakin Skywalker',
};
const r2d2 = {
  name: 'R2-D2',
};
const c3po = {
  name: 'C-3PO',
};
const chewbacca = {
  name: 'Chewbacca',
};
const obiWan = {
  name: 'Obi-Wan Kenobi',
};
const hanSolo = {
  name: 'Han Solo',
};
const palpatine = {
  name: 'Palpatine',
};

const characters = [
  lukeSkywalker,
  leiaOrgana,
  darthVader,
  r2d2,
  c3po,
  chewbacca,
  obiWan,
  hanSolo,
  palpatine,
];

/**
 *  type Character {
 *    name: String!
 *  }
 */
const characterType = new GraphQLObjectType({
  name: 'Character',
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

/**
 *  type CharacterConnection {
 *    edges: [CharacterEdge]
 *    pageInfo: PageInfo!
 *  }
 */
const { connectionType: characterConnection } = connectionDefinitions({
  nodeType: characterType,
  connectionFields: () => ({
    // Here, you can add some connection fields
  }),
});

/**
 *  type Query {
 *    humans(first: Int, after: String): HumanConnection!
 *  }
 */
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    characters: {
      type: new GraphQLNonNull(characterConnection),
      description: 'The characters of Star Wars.',
      args: forwardConnectionArgs,
      resolve: (_, args) => connectionFromArray(characters, args),
    },
  },
});

const schema = new GraphQLSchema({ query: queryType });

console.log('Dumping GraphQL schema :\n');
console.log(printSchema(schema));

const query = `{
  characters(first: 3, after: "${offsetToCursor(3)}") {
    edges {
      cursor
      node {
        name
      }
    }
    pageInfo {
      hasNextPage
      endCursor
      startCursor
    }
  }
}`;

console.log('Executing a test query :\n', query, '\n');

const result = graphqlSync(schema, query);
console.log('\nExecution result :');
console.log(JSON.stringify(result, null, true), '\n');

const { graphqlHTTP } = expressGraphQL;

var app = express();

app.use(
  '/graphql',
  graphqlHTTP((req) => ({
    schema,
    graphiql: {
      defaultQuery: query,
    },
  }))
);

app.use('/', (req, res) => {
  res.redirect('/graphql');
});

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
