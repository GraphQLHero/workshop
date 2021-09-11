import fs from 'fs';
import express from 'express';
import expressGraphQL from 'express-graphql';
import graphqlM from 'graphql';
import graphqlRelay from 'graphql-relay';
import supabaseJS from '@supabase/supabase-js';
import populateDatabase from './populateDatabase.js';

const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLList,
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
await populateDatabase(supabase);

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
        const { data: human } = await supabase
          .from('human')
          .select('*')
          .eq('id', id)
          .single();
        if (!human) return null;
        return { ...human, __typename: 'Human' };
      case 'Film':
        const { data: film } = await supabase
          .from('film')
          .select('*')
          .eq('id', id)
          .single();
        if (!film) return null;
        return { ...film, __typename: 'Film' };
      case 'Planet':
        const { data: planet } = await supabase
          .from('planet')
          .select('*')
          .eq('id', id)
          .single();
        if (!planet) return null;
        return { ...planet, __typename: 'Planet' };
    }
  },
  (obj) => {
    switch (obj.__typename) {
      case 'Human':
        return humanType;
      case 'Film':
        return filmType;
      case 'Planet':
        return planetType;
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
 *  type Planet implements Node {
 *    id: ID!
 *    name: String!
 *  }
 */
const planetType = new GraphQLObjectType({
  name: 'Planet',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('Planet'),
    name: {
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
    films: {
      type: new GraphQLList(filmType),
      resolve: async (_, args, { supabase }) => {
        const { data } = await supabase.from('film').select('*');
        return data;
      },
    },
    planets: {
      type: new GraphQLList(planetType),
      resolve: async (_, args, { supabase }) => {
        const { data } = await supabase.from('planet').select('*');
        return data;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: queryType,
  types: [humanType, filmType, planetType],
});

fs.writeFileSync('schema.graphql', printSchema(schema));

const { graphqlHTTP } = expressGraphQL;
var app = express();

app.use(
  '/graphql',
  graphqlHTTP((req) => ({
    schema,
    context: { supabase },
    graphiql: {
      defaultQuery: `{
        node(id: "${toGlobalId('Human', 1)}") {
          id
          ... on Human {
            name
          }
        }
      }`,
    },
  }))
);

app.use('/', (req, res) => {
  res.redirect('/graphql');
});

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
