import browserify from 'browserify';
import watchify from 'watchify';
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
    if (path.dirname(file.slice(dir.length)) === '/app/actions') {
      return `require("${__dirname}/index").default.actions`;
    }
  }
};

function ensureTmpPathExists(config) {
  if (!fs.existsSync(config.app.tmpPath)) fs.mkdirSync(config.app.tmpPath);
}

function buildIndexEntryPoint(config) {
  const entryPointPath = config.app.tmpPath + '/index.js';
  const requireGlobs = "['app/actions/*.jsx', 'app/views/**/*.jsx', 'config/*.jsx']";
  console.log('Writing index entry point to', entryPointPath);
  fs.writeFileSync(entryPointPath, `export default require('bulk-require')('${config.app.rootPath}', ${requireGlobs});`);
  console.log('Finished writing index entry point.');
  return entryPointPath;
}

function indexStream({ config, onBuildFinish }) {
  const indexPath = config.app.tmpPath + '/index.dist.js';
  console.log('Writing app index to', config.app.rootPath);

  return fs.createWriteStream(indexPath).on('finish', function () {
    console.log('Finished writing app index.');
    delete require.cache[indexPath];
    onBuildFinish(require(indexPath).default);
  });
}

export function buildIndex({ config, onBuildFinish }) {
  ensureTmpPathExists(config);

  browserify(buildIndexEntryPoint(config), { standalone: 'app', insertGlobalVars })
    .transform('babelify', { presets: ['es2015', 'react'] })
    .transform('bulkify')
    .bundle()
    .pipe(indexStream({ config, onBuildFinish }));
}

export function watchIndex({ config, onBuildFinish, onFirstBuildFinish }) {
  ensureTmpPathExists(config);

  const entries = buildIndexEntryPoint(config);
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

  b.on('update', () => b.bundle().pipe(indexStream({ config, onBuildFinish })));
  b.bundle().pipe(indexStream({ config, onBuildFinish: onFirstBuildFinish }));
}

function buildClientEntryPoint(config) {
  const entryPointPath = config.app.tmpPath + '/client.js';
  console.log('Writing client entry point to', entryPointPath);
  fs.writeFileSync(entryPointPath, `require('${__dirname}/client').run({ app: require('./index.js').default })`);
  return entryPointPath;
}

function clientStream({ config, onBuildFinish }) {
  const clientPath = config.app.tmpPath + '/client.dist.js';
  console.log('Writing client to', config.app.rootPath);

  return fs.createWriteStream(clientPath).on('finish', function () {
    console.log('Finished writting client.');
    onBuildFinish(clientPath);
  });
}

export function buildClient({ config, onBuildFinish }) {
  ensureTmpPathExists(config);

  browserify(buildClientEntryPoint(config), { insertGlobalVars })
    .transform('babelify', { presets: ['es2015', 'react'] })
    .transform('bulkify')
    .bundle()
    .pipe(clientStream({ config, onBuildFinish }));
}

export function watchClient({ config, onBuildFinish }) {
  const entries = buildClientEntryPoint(config);
  const cache = {};
  const packageCache = {};
  const plugin = [watchify];

  ensureTmpPathExists(config);

  let b = browserify({ cache,
                       entries,
                       insertGlobalVars,
                       packageCache,
                       plugin })
    .transform('babelify', { presets: ['es2015', 'react'] })
    .transform('bulkify');

  b.on('update', () => b.bundle().pipe(clientStream({ config, onBuildFinish })));
  b.bundle().pipe(clientStream({ config, onBuildFinish }));
}
