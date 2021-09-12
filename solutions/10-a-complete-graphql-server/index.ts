import express from 'express';
import session from 'express-session';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';
import database from './database';
import defaultQuery from './utils/defaultQuery';

declare module 'express-session' {
  interface SessionData {
   viewer: { username: string };
  }
}

var app = express();

app.use(
  session({
    secret: 'A super secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000, secure: false },
  })
);

const buildContext = (req: express.Request) => {
  // Access the session to fetch the viewer…
  let viewer = null;
  if (req.session && req.session.viewer) {
    viewer = req.session.viewer;
  }

  return { req, viewer, database };
};

app.use(
  '/graphql',
  graphqlHTTP((request) => ({
    schema,
    // @ts-expect-error
    context: buildContext(request),
    graphiql: {
      defaultQuery
    },
  }))
);
 
app.use('/login', (req, res) => {
  req.session.viewer = { username: 'Spyl' };
  res.send('Bienvenue Spyl ! <a href="/graphql">Retourner sur GraphiQL.</a>');
});

app.use('/logout', (req, res) => {
  req.session.destroy(() => {});
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
