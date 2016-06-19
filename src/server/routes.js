import React from 'react';
import { Route, IndexRoute } from 'react-router';
import pageToContainer from './pageToContainer';

function createRoute(appTree, [path, { page, actions }]) {
  const component = pageToContainer({ appTree, page, actions });

  if (path === '/') {
    return React.createElement(IndexRoute, { component, key: path });
  } else {
    return React.createElement(Route, { component, path: path.slice(1), key: path });
  }
}

export default function routes({ appTree }) {
  const routes = appTree.config.routes.default.map(route => createRoute(appTree, route));
  return React.createElement(Route, { path: '/' }, routes);
}
