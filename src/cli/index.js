#!/usr/bin/env node

import program from 'commander';
import { version } from '../../package';

program
  .version(version)
  .command('new [app-name]', 'Create new app')
  .command('dev', 'Run development env')
  .command('server', 'Run server')
  .parse(process.argv);
