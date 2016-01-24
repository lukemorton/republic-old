import React from 'react';
import Layout from './layout';

export default function ({ app, config }) {
  const Layout = app.views.layouts.application.default;
  return (
    <Layout config={config}>
      <div>Hello World</div>
    </Layout>
  );
}
