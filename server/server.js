import path from 'path';
import express from 'express';
import request from 'request';
import historyApiFallback from 'connect-history-api-fallback';

import Database from '../graphql/Database';
import createGraphQlServer from './graphQlServer';

const GRAPHQL_PORT = 8080;
const RELAY_PORT = 3000;

createGraphQlServer(GRAPHQL_PORT, new Database());

const pathBase = path.resolve(__dirname, '../');
const app = express();

app.use(historyApiFallback());
app.use('/', express.static(`${pathBase}/build`));

app.use('/graphql', (req, res) => {
  req.pipe(request(`http://localhost:${GRAPHQL_PORT}/graphql`)).pipe(res);
});

if (!process.env.PRODUCTION) {
  const webpack = require('webpack');
  const config = require('../webpack.local.config.js');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const compiler = webpack(config);
  const options = {
    noInfo: true,
    stats: { colors: true },
  };

  app.use(webpackDevMiddleware(compiler, options));
  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(config.output.publicPath));

  app.listen(RELAY_PORT, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`App is now running on http://localhost:${RELAY_PORT}`);
    }
  });
} else {
  const port = process.env.PORT || 3000;
  const server = app.listen(port, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Pivotal Tomato at http://%s:%s', host, port);
  });
}
