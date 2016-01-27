import browserify from 'browserify';
import fs from 'fs';

const browserifyOptions = {
  standalone: 'app',
  insertGlobalVars: {
    React: function (file, dir) {
      return 'require("react")';
    }
  }
};

function buildIndexEntryPoint(config) {
  const entryPointPath = config.app.tmpPath + '/index.js';
  console.log('Writing index to', entryPointPath);
  fs.writeFileSync(entryPointPath, `export default require('bulk-require')('${config.app.rootPath}', ['app/views/**/*.jsx', 'config/*.jsx']);`);
  return entryPointPath;
}

function indexStream({ config, onBuildFinish, url }) {
  const bundlePath = config.app.tmpPath + '/bundle.js';
  console.log('Building app index at', config.app.rootPath);

  return fs.createWriteStream(bundlePath).on('finish', function () {
    console.log('Finished building app index.');
	  delete require.cache[bundlePath];
    onBuildFinish(require(bundlePath).default);
  });
}

export function buildIndex({ config, onBuildFinish }) {
  if (!fs.existsSync(config.app.tmpPath)) fs.mkdirSync(config.app.tmpPath);

  browserify(buildIndexEntryPoint(config), browserifyOptions)
    .transform('babelify', { presets: ['es2015', 'react'] })
    .transform('bulkify')
    .bundle()
    .pipe(indexStream({ config, onBuildFinish }));
}
