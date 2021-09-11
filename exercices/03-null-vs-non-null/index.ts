import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import  {
  GraphQLString,
  GraphQLID,
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  printSchema,
  graphqlSync,
} from 'graphql';

// Our objects fetched from our database
const lukeSkywalker = {
  id: '123',
  name: 'Luke Skywalker',
  gender: 'MALE',
};
const leiaOrgana = {
  id: '456',
  // Used to generate an error.
  name: null,
  gender: 'FEMALE',
};

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
 *    id: ID!
 *    name: String!
 *  }
 */
const humanType = new GraphQLObjectType({
  name: 'Human',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: (obj) => {
        console.log('Resolver called: Human.id');
        return obj.id;
      },
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (obj) => {
        console.log('Resolver called: Human.name');
        return obj.name;
      },
    },
    gender: {
      type: new GraphQLNonNull(humanGenderEnum),
      resolve: (obj) => {
        console.log('Resolver called: Human.gender');
        return obj.gender;
      },
    },
  },
});

/**
 *  type Query {
 *    strongestJedi: Human
 *    humans: [Human!]!
 *  }
 */
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    humans: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(humanType))),
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
console.log(JSON.stringify(result, undefined, 2), '\n');

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
