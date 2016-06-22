import browserify from 'browserify';
import babelify from 'babelify';
import bulkify from 'bulkify';
import clientStream from './clientStream';
import { ensureTmpPathExists, insertGlobalVars } from './utils';
import buildClientEntryPoint from './buildClientEntryPoint';

export default function buildClient({ config, logger, onBuildFinish }) {
  ensureTmpPathExists(config);

  browserify(buildClientEntryPoint(config, logger), { insertGlobalVars })
    .transform(babelify, { presets: ['es2015', 'react'] })
    .transform(bulkify)
    .bundle()
    .pipe(clientStream({ config, logger, onBuildFinish }));
}
