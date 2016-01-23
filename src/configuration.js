export function loadConfig(env) {
  return {
    app: { assetPath: '', viewPath: `${__dirname}/../examples/app/views/` },
    express: { serveStatic: false },
    port: 3000
  };
}
