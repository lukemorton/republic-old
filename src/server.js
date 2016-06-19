import express from 'express';
import { renderToStaticMarkup } from 'react-dom-stream/server';
import { watchIndex, watchClient } from './application';
import loadConfig from './core/configuration';
import createLogger from './server/logger';
import httpLogger from './server/httpLogger';
import { match } from 'react-router';
import createStore from './core/store';
import { createRoutes } from './routing';
import ServerContainer from './containers/server';

function serveStatic(server, config) {
  if (!config.express.serveStatic) return;
  server.use(express.static(config.app.assetPath));
}

function serveClient(server, config) {
  server.get('/assets/javascripts/client.dist.js', function (request, response) {
    response.sendFile(config.app.tmpPath + '/client.dist.js');
  });
}

function renderPage(config, dependencies, logger) {
  return function (request, response) {
    const { appTree } = dependencies;
    const store = createStore();

    match({ routes: createRoutes({ appTree, store }), location: request.url }, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        logger.info('Redirect location:', redirectLocation);
        response.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        logger.error('Routing error:', error);
        response.status(500).send(error.message);
      } else if (!renderProps) {
        response.status(404).send('Not found');
      } else {
        response.write('<!DOCTYPE html>');
        renderToStaticMarkup(ServerContainer({ appTree, config, store, renderProps })).pipe(response);
      }
    });
  };
}

export function createServer({ config, dependencies, logger }) {
  const server = express();
  server.use(httpLogger({ config, logger }));
  serveStatic(server, config);
  serveClient(server, config);
  server.use(renderPage(config, dependencies, logger));
  return server;
}

export function run({ env, onStart, rootDir }) {
  const config = loadConfig({ env, rootDir });
  const logger = createLogger({ config });
  let dependencies = {};

  logger.info('It all started when they descended to the Piraeus...');

  function onFirstBuildFinish(appTree) {
    dependencies.appTree = appTree;

    const server = createServer({ config, dependencies, logger });

    server.listen(config.port, function () {
      logger.info(`server[port]: ${config.port}`);
      logger.info('server[code]: loaded');
      if (onStart) onStart(server);
    });
  }

  function onBuildFinish(appTree) {
    dependencies.appTree = appTree;
    logger.info('server[code]: reloaded');
  }

  function onClientBuildFinish(clientPath) {
    logger.info('client[code]: reloaded');
  }

  watchIndex({ config, logger, onFirstBuildFinish, onBuildFinish });
  watchClient({ config, logger, onBuildFinish: onClientBuildFinish });
}
