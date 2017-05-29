import express from 'express';
import graphQLHTTP from 'express-graphql';
import cookieSession from 'cookie-session';

import Schema from '../graphql/schema';
import { decodeToken, createAnonymousToken, ANONYMOUS_TOKEN_DATA } from './authentication';

function loadSessionData(req) {
  if (req.session && req.session.token) {
    return new Promise((resolve) => {
      let tokenData = null;
      try {
        tokenData = decodeToken(req.session.token);
      } catch (err) {
        console.log(err);
      }
      resolve(tokenData);
    });
  } else {
    return new Promise((resolve) => {
      resolve(null);
    });
  }
}

function getSessionData(req, res, next) {
  loadSessionData(req).then((tokenData) => {
    if (!tokenData) {
      tokenData = ANONYMOUS_TOKEN_DATA
      req.session.token = createAnonymousToken();
    }

    req.tokenData = tokenData;
    next();
  }).catch((err) => {
    res.sendStatus(400);
  });
}


export default function createGraphQlServer(port, database) {
  // Expose a GraphQL endpoint
  const graphQLServer = express();

  graphQLServer.use(cookieSession({
    name: 'session',
    keys: ['id', 'token']
  }));

  graphQLServer.use('/graphql', getSessionData, graphQLHTTP(({ session, tokenData }) => ({
    graphiql: true,
    pretty: true,
    schema: Schema,
    context: { db: database },
    rootValue: { session, tokenData }
  })
  ));

  return graphQLServer.listen(port, () => console.log(
    `GraphQL Server is now running on http://localhost:${port}`
  ));
}
