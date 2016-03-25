import { createStore } from '../src/store';

describe('Store', function () {
  context('when creating store', function () {
    it('should respond to MERGE_STATE action', function () {
      const store = createStore();
      const state = { test: true };
      store.dispatch({ type: 'MERGE_STATE', state });
      expect(store.getState()).to.deep.equal(state);
    });
  });
});
