import App from './views/application';
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

function buildIndex(config) {
  const indexPath = config.app.tmpPath + '/index.js';
  console.log('Writing index to', indexPath);
  fs.writeFileSync(indexPath, `export default require('bulk-require')('${config.app.rootPath}', ['views/**/*.jsx']);`);
  return indexPath;
}

function serverBundleStream(config, onFinish) {
  const bundlePath = config.app.tmpPath + '/bundle.js';
  console.log('Building app at', config.app.rootPath);

  return fs.createWriteStream(bundlePath)
    .on('finish', function () {
      console.log('Finished building app.');
      onFinish(App({ app: require(bundlePath).default, config }));
    });
}

export function buildApp({ config, onFinish }) {
  if (!fs.existsSync(config.app.tmpPath)) fs.mkdirSync(config.app.tmpPath);

  browserify(buildIndex(config), browserifyOptions)
    .transform('babelify', { presets: ['es2015', 'react'] })
    .transform('bulkify')
    .bundle()
    .pipe(serverBundleStream(config, onFinish));
}
