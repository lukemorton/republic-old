import * as Redux from 'redux';
import thunk from 'redux-thunk';
import merge from 'lodash/merge';

function stateReducer(state = {}, action) {
  switch (action.type) {
    case 'MERGE_STATE': return merge(state, action.state);
    default: return state;
  }
}

export default function store() {
  return Redux.applyMiddleware(thunk)(Redux.createStore)(stateReducer, global.__INITIAL_STATE__);
}
