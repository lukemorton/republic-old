import ReactDOM from 'react-dom';
import ClientContainer from './containers/client';
import { createStore } from './store';

export function run({ app }) {
  const store = createStore();
  ReactDOM.render(ClientContainer({ app, store }), document.body);
}
