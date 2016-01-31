import isFunction from 'lodash/isfunction';

export function merge(state) {
  if (isFunction(state)) {
    return function (dispatch, getState) {
      dispatch({ state: state(getState()), type: 'MERGE_STATE' });
    };
  } else {
    return { state, type: 'MERGE_STATE' };
  }
}
