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
      match({ routes: app.config.routes.default, location: request.url }, (error, redirectLocation, renderProps) => {
        if (redirectLocation) {
          response.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
          console.log('error:', error);
          console.log('redirectLocation:', redirectLocation);
          response.status(500).send(error.message);
        } else if (!renderProps) {
          console.log('no route matched');
          response.status(404).send('Not found');
        } else {
          const store = createStore();
          response.write('<!DOCTYPE html>');
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
