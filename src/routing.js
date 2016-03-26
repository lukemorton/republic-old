import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { pageToComponent } from './components';

function createRoute(appTree, [path, { page, actions }]) {
  const component = pageToComponent({ appTree, page, actions });

  if (path === '/') {
    return React.createElement(IndexRoute, { component, key: path });
  } else {
    return React.createElement(Route, { component, path: path.slice(1), key: path });
  }
}

export function createRoutes({ appTree }) {
  const routes = appTree.config.routes.default.map(route => createRoute(appTree, route));
  return React.createElement(Route, { path: '/' }, routes);
}
