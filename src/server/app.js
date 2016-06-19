import express from 'express';
import httpLogger from './httpLogger';
import router from './router';

function serveStatic(server, config) {
  if (!config.express.serveStatic) return;
  server.use(express.static(config.app.assetPath));
}

function serveClient(server, config) {
  server.get('/assets/javascripts/client.dist.js', function (request, response) {
    response.sendFile(config.app.tmpPath + '/client.dist.js');
  });
}

export default function app({ config, dependencies, logger }) {
  const server = express();
  server.use(httpLogger({ config, logger }));
  serveStatic(server, config);
  serveClient(server, config);
  server.use(router({ config, dependencies, logger }));
  return server;
}
