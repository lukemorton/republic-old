import path from 'path';

function defaultConfig() {
  const app = {
    assetsPath: path.resolve(process.cwd() + '/app/assets/'),
    tmpPath: path.resolve(process.cwd() + '/tmp/'),
    rootPath: path.resolve(process.cwd() + '/app/'),
    viewsPath: path.resolve(process.cwd() + '/app/views/')
  };

  const express = {
    serveStatic: false
  };

  return { port: 3000, app, express };
}

export function loadConfig(env) {
  return defaultConfig();
}
