import path from 'path';

function defaultConfig() {
  const app = {
    assetsPath: path.join(process.cwd(), '/app/assets/'),
    tmpPath: path.join(process.cwd(), '/tmp/'),
    rootPath: path.join(process.cwd(), '/'),
    viewsPath: path.join(process.cwd(), '/app/views/')
  };

  const express = {
    serveStatic: false
  };

  return { port: 3000, app, express };
}

export function loadConfig(env) {
  return defaultConfig();
}
