import fs from 'fs';
import path from 'path';

function ensureTmpPathExists(config) {
  if (!fs.existsSync(config.app.tmpPath)) fs.mkdirSync(config.app.tmpPath);
}

const insertGlobalVars = {
  React: function (file, dir) {
    return 'require("react")';
  },
  Link: function (file, dir) {
    return 'require("react-router").Link';
  },
  actions: function (file, dir) {
    if (path.dirname(file).endsWith('/app/actions')) {
      return `require("${__dirname}/../index").default.actions`;
    }
  }
};

export { ensureTmpPathExists, insertGlobalVars };
