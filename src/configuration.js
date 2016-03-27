import path from 'path';

function loggerLevel() {
  const verbosity = parseInt(process.env.VERBOSE, 10);

  if (verbosity >= 2) {
    return 'debug';
  } else if (verbosity >= 1) {
    return 'verbose';
  } else {
    return 'info';
  }
}

function defaultConfig(env, rootDir = process.cwd()) {
  const app = {
    assetsPath: path.resolve(rootDir + '/app/assets/'),
    tmpPath: path.resolve(rootDir + '/tmp/'),
    rootPath: path.resolve(rootDir + '/'),
    viewsPath: path.resolve(rootDir + '/app/views/')
  };

  const express = {
    serveStatic: false
  };

  const logger = {
    level: loggerLevel()
  };

  return { port: 3000, app, env, express, logger };
}

export function loadConfig({ env, rootDir }) {
  return defaultConfig(env, rootDir);
}
