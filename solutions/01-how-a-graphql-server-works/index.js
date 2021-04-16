import express from 'express';
import expressGraphQL from 'express-graphql';
import graphqlM from 'graphql';
import supabaseJS from '@supabase/supabase-js';
import populateDatabase from './populateDatabase.js';

const {
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLSchema,
  printSchema,
  graphql,
} = graphqlM;

// We put objects in our database
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const { createClient } = supabaseJS;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
await populateDatabase(supabase);

const humanType = new GraphQLObjectType({
  name: 'Human',
  fields: {
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    height: {
      type: GraphQLInt,
    },
    mass: {
      type: GraphQLFloat,
    },
    avatarUrl: {
      type: GraphQLString,
      resolve: (v) => v.avatar_url,
    },
    isJedi: {
      type: GraphQLBoolean,
      resolve: (v) => v.is_jedi,
    },
  },
});

const droidType = new GraphQLObjectType({
  name: 'Droid',
  fields: {
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    height: {
      type: GraphQLInt,
    },
    mass: {
      type: GraphQLFloat,
    },
    model: {
      type: GraphQLString,
    },
  },
});

const wookieType = new GraphQLObjectType({
  name: 'Wookie',
  fields: {
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    height: {
      type: GraphQLInt,
    },
    mass: {
      type: GraphQLFloat,
    },
    hairColor: {
      type: GraphQLString,
      resolve: (v) => v.hair_color,
    },
  },
});

const findHumanById = async (id) => {
  const { data, error } = await supabase
    .from('human')
    .select('*')
    .filter('id', 'eq', id)
    .single();
  if (error) {
    console.error(error);
  }
  return data;
};

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    strongestJedi: {
      type: humanType,
      resolve: () => findHumanById(1),
    },
    leiaOrgana: {
      type: humanType,
      resolve: () => findHumanById(2),
    },
    hanSolo: {
      type: humanType,
      resolve: () => findHumanById(3),
    },
    strongestDroid: {
      type: droidType,
      resolve: async () => {
        const { data: r2d2FromDb } = await supabase
          .from('droid')
          .select('*')
          .filter('id', 'eq', 1)
          .single();
        return r2d2FromDb;
      },
    },
    strongestWookie: {
      type: wookieType,
      resolve: async () => {
        const { data: chewbaccaFromDb } = await supabase
          .from('wookie')
          .select('*')
          .filter('id', 'eq', 1)
          .single();
        return chewbaccaFromDb;
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

console.log('Executing a test query :\n', query, '\n');

const result = await graphql(schema, query);
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
