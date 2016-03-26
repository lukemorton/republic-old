import React from 'react';
import { connect } from 'react-redux';

function actionFn(appTree, module, action) {
  if (appTree.app.actions && appTree.app.actions[module] && appTree.app.actions[module][action]) {
    return appTree.app.actions[module][action];
  } else {
    throw new Error('Action not found');
  }
}

function wrapInLayout(appTree, props, component) {
  if (appTree.app.views.layouts && appTree.app.views.layouts.application) {
    const Layout = appTree.app.views.layouts.application.default;
    return React.createElement(Layout, props, component);
  } else {
    return component;
  }
}

export function pageToComponent({ appTree, page, actions = [] }) {
  const [module, view] = page.split('#');
  const component = appTree.app.views[module][view].default;
  const componentActions = actions.map(actionFn.bind(this, appTree, module));

  const connectedComponent = connect(state => state)(function (props) {
    if (process.browser) {
      componentActions.map(action => props.dispatch(action(props)));
    }

    return wrapInLayout(appTree, props, React.createElement(component, props));
  });

  connectedComponent.actions = componentActions;

  return connectedComponent;
}
