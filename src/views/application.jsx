import React from 'react';
import Layout from './layout';
import { createStore } from '../store';
import { Provider } from 'react-redux';

function initialStateScript(initialState) {
  const __html = `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}`;
  return <script dangerouslySetInnerHTML={{ __html }}></script>;
}

export default function ({ app, config }) {
  const Layout = app.views.layouts.application.default;
  const store = createStore();
  return (
    <Provider store={store}>
      <Layout config={config}
              initialStateScript={initialStateScript(store.getState())}>
        <div>Hello World</div>
      </Layout>
    </Provider>
  );
}
