import React from 'react';
import { connect } from 'react-redux';

function findComponentClass(appTree, module, view) {
  if (!appTree.app.views) {
    throw new Error('Application does not have any views');
  } else if (!appTree.app.views[module]) {
    throw new Error(`Module ${module} not found in views directory`);
  } else if (!appTree.app.views[module][view]) {
    throw new Error(`View ${module}#${view} not found`);
  }

  return appTree.app.views[module][view].default;
}

function findComponentActions(appTree, module, actions) {
  if (actions.length === 0) {
    return [];
  } else if (!appTree.app.actions) {
    throw new Error('Application does not have any actions');
  } else if (!appTree.app.actions[module]) {
    throw new Error(`Module ${module} not found in actions directory`);
  }

  return actions.map(findComponentAction.bind(this, appTree, module));
}

function findComponentAction(appTree, module, action) {
  if (!appTree.app.actions[module][action]) {
    throw new Error(`Action ${module}#${action} not found`);
  }

  return appTree.app.actions[module][action];
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
  const component = findComponentClass(appTree, module, view);
  const componentActions = findComponentActions(appTree, module, actions);

  const connectedComponent = connect(state => state)(function (props) {
    if (process.browser) {
      componentActions.map(action => props.dispatch(action(props)));
    }

    return wrapInLayout(appTree, props, React.createElement(component, props));
  });

  connectedComponent.actions = componentActions;

  return connectedComponent;
}
