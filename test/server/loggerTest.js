import logger from '../../src/server/logger';

describe('logger()', function () {
  const config = { logger: {} };

  context('when instantiating logger', function () {
    it('should have stream defined', function () {
      expect(logger({ config }).stream).to.be.defined;
    });
  });
});
