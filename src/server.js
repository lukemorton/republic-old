import express from 'express';
import { renderToStaticMarkup } from 'react-dom-stream/server';
import { buildApp } from './application';
import { loadConfig } from './configuration';

function serveStatic(app, config) {
  if (!config.express.serveStatic) return;
  app.use(express.static(config.app.assetPath));
}

function renderPage(config) {
  return function(request, response) {
    const App = buildApp({ config });
    response.write('<!DOCTYPE html>');
    renderToStaticMarkup(App({ config })).pipe(response);
  };
}

function createApp(config) {
  const app = express();
  serveStatic(app, config);
  app.use(renderPage(config));
  return app;
}

export function run({ env }) {
  const config = loadConfig(env);
  console.log('It all started when they descended to the Piraeus...');

  createApp(config).listen(config.port, function() {
    console.log(`on port ${config.port}`);
  });
}
