import * as Redux from 'redux';
import merge from 'deepmerge';

export function createStore(config) {
  return Redux.createStore(function (state = {}, action) {
    switch (action.type) {
      case 'MERGE_STATE': return merge(state, action.state);
      default: return state;
    }
  });
}
