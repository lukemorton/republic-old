import browserify from 'browserify';
import babelify from 'babelify';
import bulkify from 'bulkify';
import watchify from 'watchify';
import { ensureTmpPathExists, insertGlobalVars } from './utils';
import buildIndexEntryPoint from './buildIndexEntryPoint';
import indexStream from './indexStream';

export default function watchIndex({ config, logger, onBuildFinish, onFirstBuildFinish }) {
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
    .transform(babelify, { presets: ['es2015', 'react'] })
    .transform(bulkify);

  function bundle(onBuildFinish) {
    return function () {
      b.bundle()
        .on('error', logger.error)
        .pipe(indexStream({ config, logger, onBuildFinish }));
    };
  }

  b.on('update', bundle(onBuildFinish));
  bundle(onFirstBuildFinish)();
}
