import { loadConfig } from '../src/configuration';
import { createServer } from '../src/server';

describe('Server', function () {
  context('when creating server', function () {
    it('should return 200', function (done) {
      const config = loadConfig({ env: 'test' });
      const server = createServer({ config, dependencyContainer: exampleContainer });
      request(server).get('/').expect(200, done);
    });
  });
});
