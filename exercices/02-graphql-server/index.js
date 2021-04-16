import session from 'express-session';
import express from 'express';
import expressGraphQL from 'express-graphql';
import graphql from 'graphql';
const {
  GraphQLString,
  GraphQLID,
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLList,
  GraphQLSchema,
  printSchema,
  graphqlSync,
} = graphql;

// Our objects fetched from our database
const lukeSkywalker = {
  id: '123',
  name: 'Luke Skywalker',
  gender: 'MALE',
};
const leiaOrgana = {
  id: '456',
  name: 'Leia Organa',
  gender: 'FEMALE',
};

/**
 *  type Viewer {
 *    username: String
 *  }
 */
const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    username: {
      type: GraphQLString,
    },
  },
});

const humanGenderEnum = new GraphQLEnumType({
  name: 'HumanGender',
  description: 'The possible gender for a human.',
  values: {
    FEMALE: {
      value: 'FEMALE',
    },
    MALE: {
      value: 'MALE',
    },
    OTHER: {
      value: 'OTHER',
    },
  },
});

/**
 *  type Human {
 *    id: ID
 *    name: String
 *    topSecretField: String
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
    gender: {
      type: humanGenderEnum,
      resolve: (obj) => {
        console.log('Resolver called: Human.gender');
        return obj.gender;
      },
    },
    topSecretField: {
      type: GraphQLString,
      resolve: (obj, args, context) => {
        console.log('Resolver called: Human.topSecretField');
        if (!context.viewer) return null;
        return 'Top Secret Info.';
      },
    },
  },
});

/**
 *  type Query {
 *    strongestJedi: Human
 *    humans: [Human]
 *    viewer: Viewer
 *  }
 */
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: {
      type: viewerType,
      resolve: (obj, args, context) => {
        console.log('Resolver called: Query.viewer');
        return context.viewer;
      },
    },
    humans: {
      type: new GraphQLList(humanType),
      resolve: () => {
        console.log('Resolver called: Query.humans');
        return [lukeSkywalker, leiaOrgana];
      },
    },
    strongestJedi: {
      type: humanType,
      resolve: () => {
        console.log('Resolver called: Query.strongestJedi');
        return lukeSkywalker;
      },
    },
  },
});

const schema = new GraphQLSchema({ query: queryType });

console.log('Dumping GraphQL schema :\n');
console.log(printSchema(schema));

const query = `{
  humans {
    id
    name
    gender
  }
}
`;

console.log('Executing a test query :\n', query, '\n');

const result = graphqlSync(schema, query);
console.log('\nExecution result :');
console.log(JSON.stringify(result, null, true), '\n');

const { graphqlHTTP } = expressGraphQL;

const buildContext = (req) => {
  // Access the session to fetch the viewer…
  let viewer = null;
  if (req.session && req.session.viewer) {
    viewer = req.session.viewer;
  }

  return { req, viewer };
};

var app = express();

app.use(
  session({
    secret: 'A super secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000, secure: false },
  })
);

app.use(
  '/graphql',
  graphqlHTTP((req) => ({
    schema,
    context: buildContext(req),
    graphiql: {
      defaultQuery: query,
    },
  }))
);

app.use('/login', (req, res) => {
  req.session.viewer = { username: 'Spyl' };
  res.send('Bienvenue Spyl ! <a href="/graphql">Retourner sur GraphiQL.</a>');
});

app.use('/logout', (req, res) => {
  req.session.destroy();
  res.send('Aurevoir ! <a href="/graphql">Retourner sur GraphiQL.</a>');
});

app.use('/', (_, res) => {
  res.send(`
    <a href="/graphql">GraphiQL</a>
    <a href="/login">Login</a>
    <a href="/logout">Logout</a>
  `);
});

app.listen(4000);
console.log('Running index at http://localhost:4000/');
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
