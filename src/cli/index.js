#!/usr/bin/env node

import program from 'commander';
import { version } from '../../package';

program
  .version(version)
  .command('dev', 'Run development env')
  .parse(process.argv);
