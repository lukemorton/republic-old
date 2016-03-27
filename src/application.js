import browserify from 'browserify';
import watchify from 'watchify';
import livereactload from 'livereactload';
import fs from 'fs';
import path from 'path';

const insertGlobalVars = {
  React: function (file, dir) {
    return 'require("react")';
  },
  Link: function (file, dir) {
    return 'require("react-router").Link';
  },
  actions: function (file, dir) {
    if (path.dirname(file).endsWith('/app/actions')) {
      return `require("${__dirname}/index").default.actions`;
    }
  }
};

function ensureTmpPathExists(config) {
  if (!fs.existsSync(config.app.tmpPath)) fs.mkdirSync(config.app.tmpPath);
}

function buildIndexEntryPoint(config, logger) {
  const entryPointPath = config.app.tmpPath + '/index.js';
  const requireGlobs = "['app/actions/*.jsx', 'app/views/**/*.jsx', 'config/*.jsx']";
  logger.verbose('Writing index entry point to', entryPointPath);
  fs.writeFileSync(entryPointPath, `module.onReload && module.onReload(() => true);
export default require('bulk-require')('${config.app.rootPath}', ${requireGlobs});`);
  logger.verbose('Finished writing index entry point.');
  return entryPointPath;
}

function indexStream({ config, logger, onBuildFinish }) {
  const indexPath = config.app.tmpPath + '/index.dist.js';
  logger.verbose('Writing app index to', config.app.rootPath);

  return fs.createWriteStream(indexPath).on('finish', function () {
    logger.verbose('Finished writing app index.');
    delete require.cache[indexPath];
    onBuildFinish(require(indexPath).default);
  });
}

export function buildIndex({ config, logger, onBuildFinish }) {
  ensureTmpPathExists(config);

  browserify(buildIndexEntryPoint(config, logger), { standalone: 'app', insertGlobalVars })
    .transform('babelify', { presets: ['es2015', 'react'] })
    .transform('bulkify')
    .bundle()
    .pipe(indexStream({ config, logger, onBuildFinish }));
}

export function watchIndex({ config, logger, onBuildFinish, onFirstBuildFinish }) {
  ensureTmpPathExists(config);

  const entries = buildIndexEntryPoint(config, logger);
  const cache = {};
  const packageCache = {};
  const plugin = [watchify];

  let b = browserify({ standalone: 'app',
                       cache,
                       entries,
                       insertGlobalVars,
                       packageCache,
                       plugin })
    .transform('babelify', { presets: ['es2015', 'react'] })
    .transform('bulkify');

  b.on('update', () => b.bundle().pipe(indexStream({ config, logger, onBuildFinish })));
  b.bundle().pipe(indexStream({ config, logger, onBuildFinish: onFirstBuildFinish }));
}

function buildClientEntryPoint(config, logger) {
  const entryPointPath = config.app.tmpPath + '/client.js';
  logger.verbose('Writing client entry point to', entryPointPath);
  fs.writeFileSync(entryPointPath, `require('${__dirname}/client').run({ app: require('./index.js').default })`);
  return entryPointPath;
}

function clientStream({ config, logger, onBuildFinish }) {
  const clientPath = config.app.tmpPath + '/client.dist.js';
  logger.verbose('Writing client to', config.app.rootPath);

  return fs.createWriteStream(clientPath).on('finish', function () {
    logger.verbose('Finished writting client.');
    onBuildFinish(clientPath);
  });
}

export function buildClient({ config, logger, onBuildFinish }) {
  ensureTmpPathExists(config);

  browserify(buildClientEntryPoint(config, logger), { insertGlobalVars })
    .transform('babelify', { presets: ['es2015', 'react'] })
    .transform('bulkify')
    .bundle()
    .pipe(clientStream({ config, logger, onBuildFinish }));
}

export function watchClient({ config, logger, onBuildFinish }) {
  ensureTmpPathExists(config);

  const entries = buildClientEntryPoint(config, logger);
  const cache = {};
  const packageCache = {};
  const plugin = [watchify, livereactload];

  let b = browserify({ cache,
                       entries,
                       insertGlobalVars,
                       packageCache,
                       plugin })
    .transform('babelify', { presets: ['es2015', 'react'] })
    .transform('bulkify');

  b.on('update', () => b.bundle().pipe(clientStream({ config, logger, onBuildFinish })));
  b.bundle().pipe(clientStream({ config, logger, onBuildFinish }));
}
