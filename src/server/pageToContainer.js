import React from 'react';
import { connect } from 'react-redux';

function findContainerClass(appTree, module, view) {
  if (!appTree.app.views) {
    throw new Error('Application does not have any views');
  } else if (!appTree.app.views[module]) {
    throw new Error(`Module ${module} not found in views directory`);
  } else if (!appTree.app.views[module][view]) {
    throw new Error(`View ${module}#${view} not found`);
  }

  return appTree.app.views[module][view].default;
}

function findContainerActions(appTree, module, actions) {
  if (actions.length === 0) {
    return [];
  } else if (!appTree.app.actions) {
    throw new Error('Application does not have any actions');
  } else if (!appTree.app.actions[module]) {
    throw new Error(`Module ${module} not found in actions directory`);
  }

  return actions.map(findContainerAction.bind(this, appTree, module));
}

function findContainerAction(appTree, module, action) {
  if (!appTree.app.actions[module][action]) {
    throw new Error(`Action ${module}#${action} not found`);
  }

  return appTree.app.actions[module][action];
}

function wrapInLayout(appTree, props, container) {
  if (appTree.app.views.layouts && appTree.app.views.layouts.application) {
    const Layout = appTree.app.views.layouts.application.default;
    return React.createElement(Layout, props, container);
  } else {
    return container;
  }
}

export default function pageToContainer({ appTree, page, actions = [] }) {
  const [module, view] = page.split('#');
  const container = findContainerClass(appTree, module, view);
  const containerActions = findContainerActions(appTree, module, actions);

  const connectedContainer = connect(state => state)(function (props) {
    if (process.browser) {
      containerActions.map(action => props.dispatch(action(props)));
    }

    return wrapInLayout(appTree, props, React.createElement(container, props));
  });

  connectedContainer.actions = containerActions;

  return connectedContainer;
}
