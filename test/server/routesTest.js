import routes from '../../src/server/routes';
import { Route } from 'react-router';

describe('Routing', function () {
  context('when creating routes', function () {
    context('and the routes no not have actions', function () {
      it('should create react routes', function () {
        const { appTree } = exampleDependencies;
        expect(isElementOfType(routes({ appTree }), Route)).to.be.true;
      });
    });

    context('and the routes have actions', function () {
      context('and the actions exist', function () {
        const actions = { hello: { loadWorld: function () {} } };
        const { appTree } = buildDependencies({ actions,
                                                routes: [['/', { page: 'hello#world', actions: ['loadWorld'] }]],
                                                views: { hello: { world: { default: {} } } } });

        it('should create react routes', function () {
          expect(isElementOfType(routes({ appTree }), Route)).to.be.true;
        });
      });
    });
  });
});
