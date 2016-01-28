import ReactDOM from 'react-dom';
import ClientContainer from './containers/client';

export function run({ app }) {
  ReactDOM.render(ClientContainer({ app }), document.body);
}
