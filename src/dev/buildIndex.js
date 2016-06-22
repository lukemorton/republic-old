import browserify from 'browserify';
import babelify from 'babelify';
import bulkify from 'bulkify';
import indexStream from './indexStream';
import { ensureTmpPathExists, insertGlobalVars } from './utils';
import buildIndexEntryPoint from './buildIndexEntryPoint';

export default function buildIndex({ config, logger, onBuildFinish }) {
  ensureTmpPathExists(config);

  browserify(buildIndexEntryPoint(config, logger), { standalone: 'app', insertGlobalVars })
    .transform(babelify, { presets: ['es2015', 'react'] })
    .transform(bulkify)
    .bundle()
    .pipe(indexStream({ config, logger, onBuildFinish }));
}
