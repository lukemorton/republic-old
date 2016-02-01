import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { connect } from 'react-redux';

function pageToComponent(app, page, actions = []) {
  const [module, view] = page.split('#');
  const component = app.app.views[module][view].default;
  const componentActions = actions.map(action => app.app.actions[module][action]);

  return connect(state => state)(React.createClass({
    componentWillMount: function () {
      componentActions.map(action => this.props.dispatch(action()));
    },
    render: function () {
      return React.createElement(component, this.props);
    }
  }));
}

function createRoute(app, [path, { page, actions }]) {
  const component = pageToComponent(app, page, actions);

  if (path === '/') {
    return React.createElement(IndexRoute, { component, key: path });
  } else {
    return React.createElement(Route, { component, path: path.slice(1), key: path });
  }
}

export function createRoutes(app) {
  const routes = app.config.routes.default.map(route => createRoute(app, route));
  return React.createElement(Route, { path: '/' }, routes);
}
