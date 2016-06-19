import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { createRoutes } from '../routing';

export default function ({ appTree, store }) {
  const routes = createRoutes({ appTree, store });

  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        {routes}
      </Router>
    </Provider>
  );
}
