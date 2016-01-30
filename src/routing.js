import React from 'react';
import { Route, IndexRoute } from 'react-router';

function pageToComponent(app, page) {
  const [module, view] = page.split('#');
  return app.app.views[module][view].default;
}

function createRoute(app, [path, { page }]) {
  const component = pageToComponent(app, page);

  if (path === '/') {
    return React.createElement(IndexRoute, { component });
  } else {
    return React.createElement(Route, { component, path: path.slice(1) });
  }
}

export function createRoutes(app) {
  const routes = app.config.routes.default.map(route => createRoute(app, route));
  return React.createElement(Route, { path: '/' }, routes);
}
