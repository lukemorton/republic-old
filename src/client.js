import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import App from './views/application';
import loadConfig from './configuration';
import { createStore } from './store';
import createHistory from 'history/lib/createHashHistory';

export function run() {
  const config = loadConfig(process.env);
  const store = createStore(config);
  const history = createHistory();
  const ClientApp = Provider({ store }, Router({ config, history }, App({ config })));
  ReactDOM.render(ClientApp, document.body);
}
