import express from 'express';
import { renderToStaticMarkup } from 'react-dom-stream/server';
import App from './application';
import Layout from './views/layout';
import loadConfig from './configuration';

function serveStatic(app, config) {
  if (!config.express.serveStatic) return;
  app.use(express.static(config.app.assetPath));
}

function renderPage(config) {
  return function (request, response) {
    response.write('<!DOCTYPE html>');
    renderToStaticMarkup(Layout({ config }, App({ config }))).pipe(response);
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
  createApp(config).listen(config.port || 3000);
}
