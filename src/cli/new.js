#!/usr/bin/env node

import program from 'commander';
import { exec } from 'child_process';
import { loadConfig } from '../configuration';
import { createLogger } from '../logging';

program.arguments('<cmd> [dir]')
  .parse(process.argv);

const exampleDir = __dirname + '/../../examples/';
const [appDir] = program.args;
const logger = createLogger({ config: loadConfig({ env: 'development' }) });

logger.info(`Creating new application inside ${appDir}...`);

function finishUp() {
  logger.info('Application installed and ready.');
  console.log('');
  logger.info('Run the following to start a development server:');
  console.log('');
  logger.info('    cd', appDir);
  logger.info('    republic dev');
  console.log('');
}

exec('cp -r ' + exampleDir + ' ' + appDir, function () {
  exec('which git').on('exit', function (code) {
    if (code > 0) {
      logger.warn('Could not find git installed so did not initialise repository');
      finishUp();
    } else {
      logger.info('Committing files to git repository...');
      exec('git init && git add . && git commit -m "New republic app"', { cwd: appDir }, function () {
        finishUp();
      });
    }
  });
});
