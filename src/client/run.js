import ReactDOM from 'react-dom';
import ClientContainer from './container';
import store from '../core/store';

export default function run({ appTree }) {
  ReactDOM.render(ClientContainer({ appTree, store: store() }), document.getElementById('republic-app'));
}
