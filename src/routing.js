import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { connect } from 'react-redux';

function actionFn(app, module, action) {
  if (app.app.actions && app.app.actions[module] && app.app.actions[module][action]) {
    return app.app.actions[module][action];
  } else {
    throw new Error('Action not found');
  }
}

function pageToComponent(app, store, page, actions = []) {
  const [module, view] = page.split('#');
  const component = app.app.views[module][view].default;
  const componentActions = actions.map(actionFn.bind(this, app, module));
  const Layout = app.app.views.layouts.application.default;

  const connectedComponent = connect(state => state)(function (props) {
    if (process.browser) {
      componentActions.map(action => props.dispatch(action(props)));
    }

    return React.createElement(Layout, props, React.createElement(component, props));
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
