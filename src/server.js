import express from 'express';
import morgan from 'morgan';
import { renderToStaticMarkup } from 'react-dom-stream/server';
import { buildApp } from './application';
import { loadConfig } from './configuration';
import { match } from 'react-router';
import { createStore } from './store';
import ServerContainer from './containers/server';

function serveStatic(app, config) {
  if (!config.express.serveStatic) return;
  app.use(express.static(config.app.assetPath));
}

function renderPage(config) {
  return function (request, response) {
    function onBuildFinish(app) {
      response.write('<!DOCTYPE html>');

      match({ routes: app.config.routes.default, location: request.url }, (error, redirectLocation, renderProps) => {
        if (error || redirectLocation) {
          console.log('error:', error);
          console.log('redirectLocation:', redirectLocation);
        } else if (!renderProps) {
          console.log('no route matched');
        } else {
          const store = createStore();
          renderToStaticMarkup(ServerContainer({ app, config, store, renderProps })).pipe(response);
        }
      });
    }

    buildApp({ config, onBuildFinish });
  };
}

function createApp(config) {
  const app = express();
  app.use(morgan('dev'));
  serveStatic(app, config);
  app.use(renderPage(config));
  return app;
}

export function run({ env }) {
  const config = loadConfig(env);
  console.log('');
  console.log('It all started when they descended to the Piraeus...');

  createApp(config).listen(config.port, function () {
    console.log(`on port ${config.port}`);
    console.log('');
  });
}
