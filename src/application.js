import browserify from 'browserify';
import fs from 'fs';

const indexBrowserifyOptions = {
  standalone: 'app',
  insertGlobalVars: {
    React: function (file, dir) {
      return 'require("react")';
    }
  }
};

function ensureTmpPathExists(config) {
  if (!fs.existsSync(config.app.tmpPath)) fs.mkdirSync(config.app.tmpPath);
}

function buildIndexEntryPoint(config) {
  const entryPointPath = config.app.tmpPath + '/index.js';
  console.log('Writing index entry point to', entryPointPath);
  fs.writeFileSync(entryPointPath, `export default require('bulk-require')('${config.app.rootPath}', ['app/views/**/*.jsx', 'config/*.jsx']);`);
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

  browserify(buildIndexEntryPoint(config), indexBrowserifyOptions)
    .transform('babelify', { presets: ['es2015', 'react'] })
    .transform('bulkify')
    .bundle()
    .pipe(indexStream({ config, onBuildFinish }));
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
    delete require.cache[bundlePath];
    onBuildFinish(clientPath);
  });
}

export function buildClient({ config, onBuildFinish }) {
  ensureTmpPathExists(config);

  browserify(buildClientEntryPoint(config))
    .transform('babelify', { presets: ['es2015', 'react'] })
    .transform('bulkify')
    .bundle()
    .pipe(clientStream({ config, onBuildFinish }));
}
