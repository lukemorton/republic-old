import React from 'react';
import { Provider } from 'react-redux';
import { RoutingContext } from 'react-router';

function initialStateScript(initialState) {
  const __html = `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}`;
  return <script dangerouslySetInnerHTML={{ __html }}></script>;
}

export default function ({ app, config, store, renderProps }) {
  const Layout = app.app.views.layouts.application.default;

  return (
    <Provider store={store}>
      <Layout config={config}
              initialStateScript={initialStateScript(store.getState())}>
        <RoutingContext {...renderProps} />
      </Layout>
    </Provider>
  );
}
