import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import useRelay from 'react-router-relay';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';

import Routes from './common/components/Routes';

import './common/base.css';

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('/graphql', {
    credentials: 'same-origin'
  })
);

ReactDOM.render(
  <Router
    history={browserHistory}
    routes={Routes}
    render={applyRouterMiddleware(useRelay)}
    environment={Relay.Store}
  />,
  document.getElementById('app')
);

