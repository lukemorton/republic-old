import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

export default function ({ app, store }) {
  const routes = app.config.routes.default;

  return (
    <Provider store={store}>
      <Router history={createBrowserHistory()}>
        {routes}
      </Router>
    </Provider>
  );
}
