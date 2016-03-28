#!/usr/bin/env node

import program from 'commander';
import { run } from '../server';

program
  .option('--env [env]', 'Set NODE_ENV to this value')
  .option('-v, --verbose', 'Level of verbosity (-v or -vv)', (v, total) => total + 1, 0)
  .parse(process.argv);

process.env.NODE_ENV = program.env || process.env.NODE_ENV || 'development';

if (program.verbose) {
  process.env.VERBOSE = program.verbose;
}

run({ env: process.env.NODE_ENV });
