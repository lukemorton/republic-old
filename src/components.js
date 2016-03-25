import { connect } from 'react-redux';

function actionFn(app, module, action) {
  if (app.app.actions && app.app.actions[module] && app.app.actions[module][action]) {
    return app.app.actions[module][action];
  } else {
    throw new Error('Action not found');
  }
}

function wrapInLayout(app, props, component) {
  if (app.app.views.layouts && app.app.views.layouts.application) {
    const Layout = app.app.views.layouts.application.default;
    return React.createElement(Layout, props, component);
  } else {
    return component;
  }
}

export function pageToComponent({ app, page, actions = [] }) {
  const [module, view] = page.split('#');
  const component = app.app.views[module][view].default;
  const componentActions = actions.map(actionFn.bind(this, app, module));

  const connectedComponent = connect(state => state)(function (props) {
    if (process.browser) {
      componentActions.map(action => props.dispatch(action(props)));
    }

    return wrapInLayout(app, props, React.createElement(component, props));
  });

  connectedComponent.actions = componentActions;

  return connectedComponent;
}
