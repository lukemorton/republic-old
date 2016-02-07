import React from 'react';
import { Provider } from 'react-redux';
import { RoutingContext } from 'react-router';
import { renderToString } from 'react-dom/server';

function dispatchActions(store, renderProps) {
  const flattenActions = (flattened, { actions } = { actions: [] }) => flattened.concat(actions);
  const actions = renderProps.components.reduce(flattenActions, []);
  actions.map(action => store.dispatch(action(renderProps.props)));
}

function appHtml(store, renderProps) {
  dispatchActions(store, renderProps);

  return renderToString(
    <Provider store={store}>
      <RoutingContext { ...renderProps } />
    </Provider>
  );
}

function initialStateScript(initialState) {
  const __html = `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}`;
  return <script dangerouslySetInnerHTML={{ __html }} key="initialStateScript"></script>;
}

function clientScript() {
  return <script src="/assets/javascripts/client.dist.js" key="clientScript"></script>;
}

export default function ({ app, store, renderProps }) {
  const Layout = app.app.views.layouts.application.default;
  const __html = appHtml(store, renderProps);

  return (
    <Layout>
      <div id="republic-app"
           dangerouslySetInnerHTML={{ __html }} />
      {initialStateScript(store.getState())}
      {clientScript()}
    </Layout>
  );
}
