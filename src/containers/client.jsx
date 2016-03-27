import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createRoutes } from '../routing';
import createBrowserHistory from 'history/lib/createBrowserHistory';

export default function ({ appTree, store }) {
  const routes = createRoutes({ appTree, store });

  return (
    <Provider store={store}>
      <Router history={createBrowserHistory()}>
        {routes}
      </Router>
    </Provider>
  );
}
