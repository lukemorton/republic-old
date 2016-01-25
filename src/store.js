import * as Redux from 'redux';
import { Provider } from 'react-redux';

export function createStore(config) {
  return Redux.createStore(function () {
    return { cool: true };
  });
}
