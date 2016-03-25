import { pageToComponent } from '../src/components';
import { connect } from 'react-redux';
import configureMockStore from 'redux-mock-store';
const mockStore = configureMockStore([]);

describe('Components', function () {
  context('when converting page to component', function () {
    it('should return connected component', function () {
      const app = appTree({ views: { hello: { world: { default: {} } } } });
      const component = pageToComponent({ app, page: 'hello#world', actions: [] });
      expect(component.displayName).to.equal('Connect(Component)');
    });

    context('and a layout is specified', function () {
      class Element extends React.Component {
        render() {
          return React.DOM.div();
        }
      }

      class Layout extends React.Component {
        render() {
          return React.DOM.div({ className: 'layout' }, this.props.children);
        }
      }

      const app = appTree({ views: { hello: { world: { default: Element } },
                                     layouts: { application: { default: Layout } } } });

      it('should wrap component with layout', function () {
        const component = pageToComponent({ app, page: 'hello#world', actions: [] });
        const wrapper = render(createElement(component, { store: mockStore() }));
        expect(wrapper.find('.layout')).to.have.length(1);
      });
    });
  });
});
