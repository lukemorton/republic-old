import configuration from '../src/core/configuration';
import logger from '../src/server/logger';
import { createServer } from '../src/server';

describe('Server', function () {
  context('when creating server', function () {
    it('should return 200', function (done) {
      const config = configuration({ env: 'test' });
      const server = createServer({ config, dependencies: exampleDependencies, logger: logger({ config }) });
      request(server).get('/').expect(200, done);
    });
  });
});
