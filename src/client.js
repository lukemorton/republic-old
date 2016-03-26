import ReactDOM from 'react-dom';
import ClientContainer from './containers/client';
import { createStore } from './store';

export function run({ appTree }) {
  const store = createStore();
  ReactDOM.render(ClientContainer({ appTree, store }), document.getElementById('republic-app'));
}
