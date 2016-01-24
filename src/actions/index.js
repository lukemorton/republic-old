#!/usr/bin/env node

import program from 'commander';
import { version } from '../package';

program
  .version(version)
  .parse(process.argv)
  .command('dev');
