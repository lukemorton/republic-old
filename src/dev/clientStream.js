import fs from 'fs';

export default function clientStream({ config, logger, onBuildFinish }) {
  const clientPath = config.app.tmpPath + '/client.dist.js';
  logger.verbose('Writing client to', config.app.rootPath);

  return fs.createWriteStream(clientPath).on('finish', function () {
    logger.verbose('Finished writting client.');
    onBuildFinish(clientPath);
  });
}
