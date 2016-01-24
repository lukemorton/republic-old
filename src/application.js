import App from './views/application';
import browserify from 'browserify';
import fs from 'fs';

const browserifyOptions = {
  standalone: 'app',
  insertGlobalVars: {
    React: function(file, dir) {
      return 'require("react")';
    }
  }
};

function buildIndex(rootPath) {
  const indexPath = __dirname + '/../index.js';
  console.log('Writing index to', indexPath);
  fs.writeFileSync(indexPath, `export default require('bulk-require')('${rootPath}', ['views/**/*.jsx']);`);
  return indexPath;
}

function serverBundleStream(config, onFinish) {
  console.log('Building app at', config.app.rootPath);

  return fs.createWriteStream('bundle.js')
    .on('finish', function() {
      console.log('Finished building app.');
      onFinish(App({ app: require('../bundle').default, config }));
    });
}

export function buildApp({ config, onFinish }) {
  browserify(buildIndex(config.app.rootPath), browserifyOptions)
    .transform('babelify', { presets: ['es2015', 'react'] })
    .transform('bulkify')
    .bundle()
    .pipe(serverBundleStream(config, onFinish));
}
