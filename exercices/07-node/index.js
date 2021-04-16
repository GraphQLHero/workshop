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
  nodeDefinitions,
  fromGlobalId,
  globalIdField,
  toGlobalId,
} = graphqlRelay;

// Our objects fetched from our database
const lukeSkywalker = {
  id: '1',
  name: 'Luke Skywalker',
  __typename: 'Human',
};
const leiaOrgana = {
  id: '2',
  name: 'Leia Organa',
  __typename: 'Human',
};

const humans = [lukeSkywalker, leiaOrgana];

/**
 * We get the node interface and field from the relay library.
 *
 * The first method is the way we resolve an ID to its object.
 * The second is the way we resolve an object that implements node to its type.
 */
const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    switch (type) {
      case 'Human':
        return humans.find((h) => h.id === id);
    }
  },
  (obj) => {
    switch (obj.__typename) {
      case 'Human':
        return humanType;
    }
  }
);

/**
 *  type Human implements Node {
 *    id: ID!
 *    name: String!
 *  }
 */
const humanType = new GraphQLObjectType({
  name: 'Human',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('Human'),
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

/**
 *  type Film {
 *    title: String!
 *  }
 */
const filmType = new GraphQLObjectType({
  name: 'Film',
  fields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

/**
 *  type Query {
 *    node(id: ID): Node
 *  }
 */
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    node: nodeField,
  },
});

const schema = new GraphQLSchema({ query: queryType, types: [humanType] });

console.log('Dumping GraphQL schema :\n');
console.log(printSchema(schema));

const query = `{
  node(id: "${toGlobalId('Human', '1')}") {
    id
    ... on Human {
      name
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
