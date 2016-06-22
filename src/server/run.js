import app from './app';
import loadConfig from '../core/configuration';
import createLogger from './logger';

export default function run({ env, onStart, rootDir }) {
  const config = loadConfig({ env, rootDir });
  const logger = createLogger({ config });

  logger.info('It all started when they descended to the Piraeus...');

  const indexPath = config.app.tmpPath + '/index.dist.js';

  const dependencies = {
    appTree: require(indexPath).default
  };

  const server = app({ config, dependencies, logger });

  server.listen(config.port, function () {
    logger.info(`server[port]: ${config.port}`);
    logger.info('server[code]: loaded');
    if (onStart) onStart(server);
  });
}
