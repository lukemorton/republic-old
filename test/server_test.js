import { loadConfig } from '../src/configuration';
import { createServer } from '../src/server';

describe('Server', function () {
  context('when creating server', function () {
    it('should return 200', function (done) {
      const config = loadConfig('test');
      const app = appTree({ routes: [['/', { page: 'hello#world' }]],
                            views: { hello: { world: { default: Element } },
                                     layouts: { application: { default: ApplicationLayout },
                                                server: { default: ServerLayout } } } });
      const dependencyContainer = { app };
      const server = createServer({ config, dependencyContainer });
      request(server).get('/').expect(200, done);
    });
  });
});
