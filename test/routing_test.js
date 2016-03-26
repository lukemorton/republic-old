import { createRoutes } from '../src/routing';
import { Route } from 'react-router';

describe('Routing', function () {
  context('when creating routes', function () {
    context('and the routes no not have actions', function () {
      it('should create react routes', function () {
        const { appTree } = exampleContainer;
        expect(isElementOfType(createRoutes({ appTree }), Route)).to.be.true;
      });
    });

    context('and the routes have actions', function () {
      function containerWithActions(actions) {
        return buildContainer({ actions,
                                routes: [['/', { page: 'hello#world', actions: ['loadWorld'] }]],
                                views: { hello: { world: { default: {} } } } });
      }

      context('and the actions exist', function () {
        const { appTree } = containerWithActions({ hello: { loadWorld: function () {} } });

        it('should create react routes', function () {
          expect(isElementOfType(createRoutes({ appTree }), Route)).to.be.true;
        });
      });

      context('and the actions do not exist', function () {
        const { appTree } = containerWithActions({});

        it('raise error regarding action not found', function () {
          expect(createRoutes.bind(this, { appTree })).to.throw('Action not found');
        });
      });
    });
  });
});
