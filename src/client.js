import ReactDOM from 'react-dom';
import App from './application';
import loadConfig from './configuration';

export function run() {
  const config = loadConfig(process.env);
  ReactDOM.render(App({ config }), document.body);
}
