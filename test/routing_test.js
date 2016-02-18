import { createRoutes } from '../src/routing';
import { Route } from 'react-router';

describe('Routing', function () {
  context('when creating routes', function () {
    context('and the routes no not have actions', function () {
      const app = appTree({ routes: [['/', { page: 'hello#world', actions: [] }]],
                            views: { hello: { world: { default: {} } } } });

      it('should create react routes', function () {
        expect(isElementOfType(createRoutes({ app }), Route)).to.be.true;
      });
    });

    context('and the routes have actions', function () {
      function appTreeWithActions(actions) {
        return appTree({ actions,
                         routes: [['/', { page: 'hello#world', actions: ['loadWorld'] }]],
                         views: { hello: { world: { default: {} } } } });
      }

      context('and the actions exist', function () {
        const app = appTreeWithActions({ hello: { loadWorld: function () {} } });

        it('should create react routes', function () {
          expect(isElementOfType(createRoutes({ app }), Route)).to.be.true;
        });
      });

      context('and the actions do not exist', function () {
        const app = appTreeWithActions({});

        it('raise error regarding action not found', function () {
          expect(createRoutes.bind(this, { app })).to.throw('Action not found');
        });
      });
    });
  });
});
