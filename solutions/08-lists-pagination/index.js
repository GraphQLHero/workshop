import fs from 'fs';
import express from 'express';
import expressGraphQL from 'express-graphql';
import graphqlM from 'graphql';
import graphqlRelay from 'graphql-relay';
import supabaseJS from '@supabase/supabase-js';
import populateDatabase from './populateDatabase.js';

const {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  printSchema,
} = graphqlM;
const {
  connectionDefinitions,
  offsetToCursor,
  connectionFromArray,
  getOffsetWithDefault,
  forwardConnectionArgs,
  connectionFromArraySlice,
} = graphqlRelay;

// We put objects in our database
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const { createClient } = supabaseJS;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
await populateDatabase(supabase);

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

const { connectionType: characterConnection } = connectionDefinitions({
  nodeType: characterType,
  connectionFields: () => ({
    totalCount: {
      description: 'Identifies the total count of items in the connection.',
      type: new GraphQLNonNull(GraphQLInt),
    },
  }),
});

/**
 *  type Query {
 *    characters: CharacterConnection!
 *  }
 */
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    characters: {
      type: new GraphQLNonNull(characterConnection),
      description: 'The characters of Star Wars.',
      args: forwardConnectionArgs,
      resolve: async (_, args) => {
        const offset = getOffsetWithDefault(args.after, 0);
        // Your custom paginated implementation
        const limit = args.first || 100;
        let { data, count } = await supabase
          .from('characters')
          .select('*', { count: 'exact' })
          .range(offset, offset + limit);
        if (!data)
          return {
            totalCount: 0,
            ...connectionFromArray([], args),
          };
        return {
          totalCount: count,
          ...connectionFromArraySlice(data, args, {
            sliceStart: offset,
            arrayLength: count,
          }),
        };
      },
    },
  },
});

const schema = new GraphQLSchema({ query: queryType });
fs.writeFileSync('schema.graphql', printSchema(schema));

const { graphqlHTTP } = expressGraphQL;
var app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: {
      defaultQuery:  `{
        characters(first: 3, after: "${offsetToCursor(3)}") {
          totalCount
          edges {
            cursor
            node {
              name
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }`,
    },
  })
);

app.use('/', (_, res) => {
  res.redirect('/graphql');
});

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
