import morgan from 'morgan';
import httpLogger from '../../src/server/httpLogger';

describe('httpLogger()', function () {
  const config = { httpLogger: { immediate: true } };
  var logger;
  beforeEach(() => logger = { stream: { write: sinon.spy() } });

  context('when instantiating logger in development', function () {
    it('should produce concise logs', function () {
      config.env = 'development';
      httpLogger({ config, logger })({}, {}, () => null);
      expect(logger.stream.write.called).to.be.true;
    });
  });

  context('when instantiating logger in test', function () {
    it('should not log', function () {
      config.env = 'test';
      httpLogger({ config, logger })({}, {}, () => null);
      expect(logger.stream.write.called).to.be.false;
    });
  });

  context('when instantiating logger in production', function () {
    it('should produce combined log', function () {
      config.env = 'production';
      morgan.format('combined', 'a combined log');
      httpLogger({ config, logger })({}, {}, () => null);
      expect(logger.stream.write.called).to.be.true;
    });
  });
});
