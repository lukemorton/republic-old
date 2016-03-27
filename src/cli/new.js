#!/usr/bin/env node

import program from 'commander';
import { exec } from 'child_process';

program.arguments('<cmd> [dir]')
  .parse(process.argv);

const exampleDir = __dirname + '/../../examples/';
const [appDir] = program.args;

console.log('Creating new application inside', appDir);

exec('cp -r ' + exampleDir + ' ' + appDir, function () {
  exec('npm install', { cwd: appDir }, function () {
    console.log('Now change into', appDir, 'and run republic dev');
  });
});
