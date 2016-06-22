import fs from 'fs';

export default function buildIndexEntryPoint(config, logger) {
  const entryPointPath = config.app.tmpPath + '/index.js';
  const requireGlobs = "['app/actions/*.jsx', 'app/views/**/*.jsx', 'config/*.jsx']";
  logger.verbose('Writing index entry point to', entryPointPath);
  fs.writeFileSync(entryPointPath, `module.onReload && module.onReload(() => true);
export default require('bulk-require')('${config.app.rootPath}', ${requireGlobs});`);
  logger.verbose('Finished writing index entry point.');
  return entryPointPath;
}
