import { pageToComponent } from '../src/components';
import { connect } from 'react-redux';
import configureMockStore from 'redux-mock-store';

describe('Components', function () {
  context('when converting page to component', function () {
    it('should return connected component', function () {
      const { appTree } = buildContainer({ views: { hello: { world: { default: {} } } } });
      const component = pageToComponent({ appTree, page: 'hello#world', actions: [] });
      expect(component.displayName).to.equal('Connect(Component)');
    });

    context('and a layout is specified', function () {
      const mockStore = configureMockStore([]);

      it('should wrap component with layout', function () {
        const { appTree } = exampleContainer;
        const component = pageToComponent({ appTree, page: 'hello#world', actions: [] });
        const wrapper = render(React.createElement(component, { store: mockStore() }));
        expect(wrapper.find('.layout')).to.have.length(1);
      });
    });
  });
});
