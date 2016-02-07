import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { connect } from 'react-redux';

function pageToComponent(app, store, page, actions = []) {
  const [module, view] = page.split('#');
  const component = app.app.views[module][view].default;
  const componentActions = actions.map(action => app.app.actions[module][action]);

  const connectedComponent = connect(state => state)(function (props) {
    if (process.browser) {
      componentActions.map(action => props.dispatch(action(props)));
    }

    return React.createElement(component, props);
  });

  connectedComponent.actions = componentActions;

  return connectedComponent;
}

function createRoute(app, store, [path, { page, actions }]) {
  const component = pageToComponent(app, store, page, actions);

  if (path === '/') {
    return React.createElement(IndexRoute, { component, key: path });
  } else {
    return React.createElement(Route, { component, path: path.slice(1), key: path });
  }
}

export function createRoutes({ app, store }) {
  const routes = app.config.routes.default.map(route => createRoute(app, store, route));
  return React.createElement(Route, { path: '/' }, routes);
}
