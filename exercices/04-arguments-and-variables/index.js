import express from 'express';
import expressGraphQL from 'express-graphql';
import graphql from 'graphql';
const {
  GraphQLBoolean,
  GraphQLString, // Le type scalaire `String` en SDL
  GraphQLID, // Le type scalaire `ID` en SDL
  GraphQLObjectType, // Le type objet en SDL
  GraphQLEnumType, // Le type enum en SDL
  GraphQLList, // Le type List en SDL
  GraphQLNonNull,
  GraphQLSchema, // Pour construire notre schéma
  printSchema, // Pour afficher le schéma en SDL
  graphqlSync, // La fonction d'éxecution synchrone
} = graphql;

// Our objects fetched from our database
const lukeSkywalker = {
  id: '123',
  name: 'Luke Skywalker',
  gender: 'MALE',
  isJedi: true,
};
const leiaOrgana = {
  id: '456',
  name: 'Leia Organa',
  gender: 'FEMALE',
  isJedi: false,
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
 *    gender: HumanGender!
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
 *    human(id: ID): Human
 *    humans(isJedi: Boolean): [Human!]!
 *  }
 */
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    humans: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(humanType))),
      args: {
        isJedi: {
          type: GraphQLBoolean,
          description: 'Whether or not the human is a jedi.',
        },
      },
      resolve: (_, args) => {
        console.log('Resolver called: Query.humans');
        console.log(
          'Resolver called with args: ' + JSON.stringify(args, null, 2)
        );
        if (args.isJedi !== null) {
          return [lukeSkywalker, leiaOrgana].filter(
            (h) => h.isJedi === args.isJedi
          );
        }
        return [lukeSkywalker, leiaOrgana];
      },
    },
    human: {
      type: humanType,
      description: 'Lookup a `Human` by its ID.',
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The ID of a `Human`.',
        },
      },
      resolve: (_, args) => {
        console.log('Resolver called: Query.human');
        console.log(
          'Resolver called with args: ' + JSON.stringify(args, null, 2)
        );
        return [lukeSkywalker, leiaOrgana].find(
          (human) => human.id === args.id
        );
      },
    },
  },
});

const schema = new GraphQLSchema({ query: queryType });

console.log('Dumping GraphQL schema :\n');
console.log(printSchema(schema));

const query = `{
  humans(isJedi: true) {
    id
    name
    gender
  }
  luke: human(id: "123") {
    name
  }
}
`;

console.log('Executing a test query :\n', query, '\n');

const result = graphqlSync(schema, query);
console.log('\nExecution result :');
console.log(JSON.stringify(result, undefined, 2), '\n');

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
