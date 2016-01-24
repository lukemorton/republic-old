import React from 'react';
import Layout from './layout';

export default function ({ app, config }) {
  const App = app.views.layouts.application.default;
  return (
    <App config={config}>
      <div>Hello World</div>
    </App>
  );
}
