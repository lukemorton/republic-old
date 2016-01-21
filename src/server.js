import express from 'express';
import { renderToStaticMarkup } from 'react-dom/server';
import App from './views/app';
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

export function run() {
  createApp(loadConfig(process.env)).listen(config.port || 3000);
}
