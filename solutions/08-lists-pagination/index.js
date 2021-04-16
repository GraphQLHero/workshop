import express from 'express';
import expressGraphQL from 'express-graphql';
import graphqlM from 'graphql';
import graphqlRelay from 'graphql-relay';
import supabaseJS from '@supabase/supabase-js';

const {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  printSchema,
  graphql,
} = graphqlM;
const {
  connectionDefinitions,
  offsetToCursor,
  connectionFromArray,
  getOffsetWithDefault,
  forwardConnectionArgs,
  connectionFromArraySlice,
} = graphqlRelay;

// Our objects fetched from our database
const lukeSkywalker = {
  id: 1,
  name: 'Luke Skywalker',
};
const leiaOrgana = {
  id: 2,
  name: 'Leia Organa',
};
const darthVader = {
  id: 3,
  name: 'Anakin Skywalker',
};
const r2d2 = {
  id: 4,
  name: 'R2-D2',
};
const c3po = {
  id: 5,
  name: 'C-3PO',
};
const chewbacca = {
  id: 6,
  name: 'Chewbacca',
};
const obiWan = {
  id: 7,
  name: 'Obi-Wan Kenobi',
};
const hanSolo = {
  id: 8,
  name: 'Han Solo',
};
const palpatine = {
  id: 9,
  name: 'Palpatine',
};

// We put objects in our database
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const { createClient } = supabaseJS;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
const { error } = await supabase.from('characters').upsert(characters);
if (error) {
  console.error(error);
}

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
 *    humans: HumanConnection!
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

console.log('Dumping GraphQL schema :\n');
console.log(printSchema(schema));

const query = `{
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
}`;

console.log('Executing a test query :\n', query, '\n');

const result = await graphql(schema, query);
console.log('\nExecution result :');
console.log(JSON.stringify(result, null, true), '\n');

const { graphqlHTTP } = expressGraphQL;

var app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: {
      defaultQuery: query,
    },
  })
);

app.use('/', (_, res) => {
  res.redirect('/graphql');
});

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
