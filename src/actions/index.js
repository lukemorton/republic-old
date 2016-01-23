#!/usr/bin/env node

import program from 'commander';
import { version } from '../package';

program
  .version(version)
  .parse(process.argv)
  .command('dev')
  .action(function(dir, otherDirs) {
    console.log('rmdir %s', dir);
    if (otherDirs) {
      otherDirs.forEach(function(oDir) {
        console.log('rmdir %s', oDir);
      });
    }
  });
