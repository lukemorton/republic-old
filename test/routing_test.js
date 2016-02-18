import { createRoutes } from '../src/routing';
import { Route } from 'react-router';

describe('Routing', function () {
  context('when creating routes', function () {
    context('and the routes no not have actions', function () {
      const config = { routes: { default: [['/', { page: 'hello#world', actions: [] }]] } };
      const views = { hello: { world: { default: {} } } };
      const app = { app: { views }, config };

      it('should create react routes', function () {
        expect(isElementOfType(createRoutes({ app }), Route)).to.be.true;
      });
    });

    context('and the routes have actions', function () {
      const config = { routes: { default: [['/', { page: 'hello#world', actions: ['loadWorld'] }]] } };

      context('and the actions exist', function () {
        const actions = { hello: { loadWorld: function () {} } };
        const views = { hello: { world: { default: {} } } };
        const app = { app: { actions, views }, config };

        it('should create react routes', function () {
          expect(isElementOfType(createRoutes({ app }), Route)).to.be.true;
        });
      });

      context('and the actions do not exist', function () {
        const views = { hello: { world: { default: {} } } };
        const app = { app: { views }, config };

        it('should create react routes', function () {
          expect(createRoutes.bind(this, { app })).to.throw('Action not found');
        });
      });
    });
  });
});
