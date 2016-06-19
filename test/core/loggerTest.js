import logger from '../../src/core/logger';

describe('logger()', function () {
  const config = { logger: {} };

  context('when instantiating logger', function () {
    it('should instantiate', function () {
      expect(logger({ config })).to.be.defined;
    });
  });

  context('when logging', function () {
    const originalWrite = process.stdout.write;
    beforeEach(() => process.stdout.write = sinon.spy());
    afterEach(() => process.stdout.write = originalWrite);

    it('should log', function () {
      logger({ config }).info('Hey');
      expect(process.stdout.write.calledOnce).to.be.true;
    });
  });
});
