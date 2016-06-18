import pageToContainer from '../../src/server/pageToContainer';
import { connect } from 'react-redux';
import configureMockStore from 'redux-mock-store';

describe('pageToContainer()', function () {
  context('when converting page to container', function () {
    it('should return connected container', function () {
      const { appTree } = buildContainer({ views: { hello: { world: { default: {} } } } });
      const container = pageToContainer({ appTree, page: 'hello#world', actions: [] });
      expect(container.displayName).to.equal('Connect(Component)');
    });

    context('and the application does not have any views', function () {
      const { appTree } = buildContainer({ views: null });

      it('should raise error regarding missing views', function () {
        expect(pageToContainer.bind(this, { appTree, page: 'hello#world' })).to.throw('Application does not have any views');
      });
    });

    context('and the module does not exist in views directory', function () {
      const { appTree } = buildContainer({ views: {} });

      it('should raise error regarding missing module', function () {
        expect(pageToContainer.bind(this, { appTree, page: 'hello#world' })).to.throw('Module hello not found in views directory');
      });
    });

    context('and the view does not exist in module', function () {
      const { appTree } = buildContainer({ views: { hello: {} } });

      it('should raise error regarding missing view', function () {
        expect(pageToContainer.bind(this, { appTree, page: 'hello#world' })).to.throw('View hello#world not found');
      });
    });

    context('and the application does not have any actions', function () {
      const { appTree } = buildContainer({ actions: null,
                                           views: { hello: { world: { default: {} } } } });
      const actions = ['loadWorld'];

      it('should raise error regarding missing views', function () {
        expect(pageToContainer.bind(this, { appTree, actions, page: 'hello#world' })).to.throw('Application does not have any actions');
      });
    });

    context('and the module does not exist in actions directory', function () {
      const { appTree } = exampleContainer;
      const actions = ['loadWorld'];

      it('raise error regarding action not found', function () {
        expect(pageToContainer.bind(this, { appTree, actions, page: 'hello#world' })).to.throw('Module hello not found in actions directory');
      });
    });

    context('and the action does not exist in module', function () {
      const { appTree } = buildContainer({ actions: { hello: {} },
                                           views: { hello: { world: { default: {} } } } });
      const actions = ['loadWorld'];

      it('raise error regarding action not found', function () {
        expect(pageToContainer.bind(this, { appTree, actions, page: 'hello#world' })).to.throw('Action hello#loadWorld not found');
      });
    });

    context('and a layout is specified', function () {
      const mockStore = configureMockStore([]);

      it('should wrap container with layout', function () {
        const { appTree } = exampleContainer;
        const container = pageToContainer({ appTree, page: 'hello#world', actions: [] });
        const wrapper = render(React.createElement(container, { store: mockStore() }));
        expect(wrapper.find('.layout')).to.have.length(1);
      });
    });
  });
});
