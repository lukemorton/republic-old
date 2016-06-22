import browserify from 'browserify';
import babelify from 'babelify';
import bulkify from 'bulkify';
import watchify from 'watchify';
import livereactload from 'livereactload';
import { ensureTmpPathExists, insertGlobalVars } from './utils';
import buildClientEntryPoint from './buildClientEntryPoint';
import clientStream from './clientStream';

export default function watchClient({ config, logger, onBuildFinish }) {
  ensureTmpPathExists(config);

  const entries = buildClientEntryPoint(config, logger);
  const cache = {};
  const packageCache = {};
  const plugin = [watchify, livereactload];
  const babelifyPlugins = [['react-transform', { transforms: [{ transform: 'livereactload/babel-transform',
                                                                imports: ['react'] }] }]];

  let b = browserify({ cache,
                       entries,
                       insertGlobalVars,
                       packageCache,
                       plugin })
    .transform(babelify, { presets: ['es2015', 'react'],
                           plugins: babelifyPlugins })
    .transform(bulkify);

  function bundle(onBuildFinish) {
    return function () {
      b.bundle()
        .on('error', logger.error)
        .pipe(clientStream({ config, logger, onBuildFinish }));
    };
  }

  b.on('update', bundle(onBuildFinish));
  bundle(onBuildFinish)();
}
