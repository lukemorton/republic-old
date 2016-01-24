import path from 'path';

export function loadConfig(env) {
  return {
    app: { assetPath: '',
           rootPath: path.resolve(`${__dirname}/../examples/app/`),
           viewPath: path.resolve(`${__dirname}/../examples/app/views/`) },
    express: { serveStatic: false },
    port: 3000
  };
}
