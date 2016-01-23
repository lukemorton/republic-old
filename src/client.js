import ReactDOM from 'react-dom';
import App from './application';
import loadConfig from './configuration';
import createStore from './store';
import createHistory from 'history/lib/createHashHistory';

export function run() {
  const config = loadConfig(process.env);
  const store = createStore(config);
  const history = createHistory();
  const ClientApp = Provider({ store }, Router({ config, history }, App({ config })));
  ReactDOM.render(ClientApp, document.body);
}
