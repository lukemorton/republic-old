import fs from 'fs';

export default function buildClientEntryPoint(config, logger) {
  const entryPointPath = config.app.tmpPath + '/client.js';
  logger.verbose('Writing client entry point to', entryPointPath);
  fs.writeFileSync(entryPointPath, `require('${__dirname}/../client/run').default({ appTree: require('./index.js').default })`);
  return entryPointPath;
}
