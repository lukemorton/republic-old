import { run } from '../src/server';

describe('Server', function () {
  context('when retrieving homepage', function () {
    it('should return 200', function (done) {
      this.timeout(40000);
      const env = 'test';
      const rootDir = 'examples';

      function assertIndexReturns200(app) {
        request(app).get('/').expect(200, done);
      }

      run({ env, rootDir, onStart: assertIndexReturns200 });
    });
  });
});
