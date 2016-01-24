import App from './views/application';
import browserify from 'browserify';
import babel from 'babel-core';
import fs from 'fs';

function buildIndex(rootPath) {
  const indexPath = __dirname + '/../index.js';
  console.log('Writing index to', indexPath);
  fs.writeFileSync(indexPath, `export default require('bulk-require')('${rootPath}', ['views/**/*.jsx']);`);
  return indexPath;
}

export function buildApp({ config, onFinish }) {
  console.log('Building app at', config.app.rootPath);

  const outputStream = fs.createWriteStream('bundle.js')
    .on('finish', function() {
      console.log('Finished building app.')
      onFinish(App({ app: require('../bundle').default, config }));
    });

  const browserifyOptions = {
    standalone: 'app',
    insertGlobalVars: {
      React: function(file, dir) {
        return 'require("react")';
      }
    }
  };

  browserify(buildIndex(config.app.rootPath), browserifyOptions)
    .transform('babelify', { presets: ['es2015', 'react'] })
    .transform('bulkify')
    .bundle()
    .pipe(outputStream);
}
