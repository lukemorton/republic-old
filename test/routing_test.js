import { createRoutes } from '../src/routing';
import { Route } from 'react-router';

describe('Routing', function () {
  const config = { routes: { default: [['/', { page: 'hello#world', actions: [] }]] } };
  const views = { hello: { world: { default: {} } } };
  const app = { app: { views }, config };

  it('should create react routes', function () {
    expect(isElementOfType(createRoutes({ app }), Route)).to.be.true;
  });
});
