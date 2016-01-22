#!/usr/bin/env node

import program from 'commander';
import { version } from '../../package';
import { run } from '../server';

run(process.env);
