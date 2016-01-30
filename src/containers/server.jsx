import React from 'react';
import { Provider } from 'react-redux';
import { RoutingContext } from 'react-router';

function initialStateScript(initialState) {
  const __html = `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}`;
  return <script dangerouslySetInnerHTML={{ __html }} key="initialStateScript"></script>;
}

function clientScript() {
  return <script src="/assets/javascripts/client.dist.js" key="clientScript"></script>
}

export default function ({ app, config, store, renderProps }) {
  const Layout = app.app.views.layouts.application.default;
  const javascripts = [initialStateScript(store.getState()),
                       clientScript()];

  return (
    <Provider store={store}>
      <Layout config={config}
              javascripts={javascripts}>
        <RoutingContext {...renderProps} />
      </Layout>
    </Provider>
  );
}
