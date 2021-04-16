import express from 'express';
import expressGraphQL from 'express-graphql';
import graphqlM from 'graphql';
import graphqlRelay from 'graphql-relay';
import supabaseJS from '@supabase/supabase-js';

const {
  graphql,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  printSchema,
} = graphqlM;
const {
  nodeDefinitions,
  fromGlobalId,
  globalIdField,
  toGlobalId,
} = graphqlRelay;

// We put objects in our database
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const { createClient } = supabaseJS;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const lukeSkywalker = {
  id: 1,
  name: 'Luke Skywalker',
};
const leiaOrgana = {
  id: 2,
  name: 'Leia Organa',
};
const newHope = {
  id: 1,
  title: 'A New Hope',
};
const empireStikesBack = {
  id: 2,
  title: 'The Empire Strikes Back',
};

const { data: newHumans } = await supabase
  .from('human')
  .upsert([lukeSkywalker, leiaOrgana]);
console.log('Inserted humans :\n');
console.log(newHumans);
const testId = newHumans[0]['id'];

const { data: newFilms } = await supabase
  .from('film')
  .upsert([newHope, empireStikesBack]);
console.log('Inserted films :\n');
console.log(newFilms);

/**
 * We get the node interface and field from the relay library.
 *
 * The first method is the way we resolve an ID to its object.
 * The second is the way we resolve an object that implements node to its type.
 */
const { nodeInterface, nodeField, nodesField } = nodeDefinitions(
  async (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    switch (type) {
      case 'Human':
        let { data: dataHumans } = await supabase
          .from('human')
          .select('*')
          .eq('id', id);
        if (!dataHumans || !dataHumans.length) return null;
        const human = dataHumans[0];
        return { ...human, __typename: 'Human' };
      case 'Film':
        let { data: dataFilms } = await supabase
          .from('film')
          .select('*')
          .eq('id', id);
        if (!dataFilms || !dataFilms.length) return null;
        const film = dataFilms[0];
        return { ...film, __typename: 'Film' };
    }
  },
  (obj) => {
    switch (obj.__typename) {
      case 'Human':
        return humanType;
      case 'Film':
        return filmType;
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
 *  type Film implements Node {
 *    id: ID!
 *    title: String!
 *  }
 */
const filmType = new GraphQLObjectType({
  name: 'Film',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('Film'),
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

/**
 *  type Query {
 *    node(id: ID): Node
 *    nodes(ids: [ID!]!): [Node]!
 *  }
 */
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    node: nodeField,
    nodes: nodesField,
  },
});

const schema = new GraphQLSchema({
  query: queryType,
  types: [humanType, filmType],
});

console.log('Dumping GraphQL schema :\n');
console.log(printSchema(schema));

const query = `{
  node(id: "${toGlobalId('Human', testId)}") {
    id
    ... on Human {
      name
    }
  }
}`;

console.log('Executing a test query :\n', query, '\n');

const result = await graphql(schema, query);
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
