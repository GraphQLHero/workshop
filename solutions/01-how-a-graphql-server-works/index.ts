import fs from 'fs';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import {
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLSchema,
  printSchema,
  graphql,
} from 'graphql';
import createDatabaseClient from './createDatabaseClient';

(async () => {

// Initialize our database
const database = await createDatabaseClient();

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

const findHumanById = async (id: number) => {
  const { data, error } = await database
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
        const { data: r2d2FromDb } = await database
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
        const { data: chewbaccaFromDb } = await database
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
fs.writeFileSync('schema.graphql', printSchema(schema));

const defaultQuery = `{
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