import { Router } from 'react-router';

function loadRoutes(config) {
  // config.app.configPath
}

export default function({ config, history }) {
  return Router({ history }, loadRoutes(config));
}
