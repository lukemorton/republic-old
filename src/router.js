import { Router } from 'react-router';
import createHistory from 'history/lib/createHashHistory';

function loadRoutes(config) {
  // config.app.configPath
}

export default function Router({ config }) {
  return Router({ history: createHistory() }, loadRoutes(config));
}
