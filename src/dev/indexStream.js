import fs from 'fs';

export default function indexStream({ config, logger, onBuildFinish }) {
  const indexPath = config.app.tmpPath + '/index.dist.js';
  logger.verbose('Writing app index to', config.app.rootPath);

  return fs.createWriteStream(indexPath).on('finish', function () {
    logger.verbose('Finished writing app index.');
    delete require.cache[indexPath];
    onBuildFinish(require(indexPath).default);
  });
}
