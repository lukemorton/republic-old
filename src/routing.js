import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { pageToComponent } from './components';

function createRoute(app, [path, { page, actions }]) {
  const component = pageToComponent({ app, page, actions });

  if (path === '/') {
    return React.createElement(IndexRoute, { component, key: path });
  } else {
    return React.createElement(Route, { component, path: path.slice(1), key: path });
  }
}

export function createRoutes({ app }) {
  const routes = app.config.routes.default.map(route => createRoute(app, route));
  return React.createElement(Route, { path: '/' }, routes);
}
