#!/usr/bin/env node

import program from 'commander';
import { exec, spawn } from 'child_process';
import { loadConfig } from '../configuration';
import { createLogger } from '../logging';

program.arguments('<cmd> [dir]')
  .parse(process.argv);

const exampleDir = __dirname + '/../../examples/';
const [appDir] = program.args;
const logger = createLogger({ config: loadConfig({ env: 'development' }) });

logger.info(`Creating new application inside ${appDir}...`);

exec('cp -r ' + exampleDir + ' ' + appDir, function () {
  logger.info('Installing dependencies...');

  const patience = setInterval(_ => logger.info('Still installing...'), 10000);

  exec('npm set progress=false && npm install', { cwd: appDir }, function () {
    clearInterval(patience);
    logger.info('Application ready.');
    console.log('');
    logger.info('Run the following to start a development server:');
    console.log('');
    logger.info('    cd', appDir);
    logger.info('    republic dev');
    console.log('');
  });
});
