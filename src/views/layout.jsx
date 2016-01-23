import React from 'react';
import Layout from './layout';

export default function ({ config, children }) {
  console.log(require(config.app.viewPath + '/layouts/application'));
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
