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
  finishUp();
});
