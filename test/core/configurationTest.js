import configuration from '../../src/core/configuration';

describe('configuration()', function () {
  context('when production env', function () {
    it('should instantiate', function () {
      const env = 'production';
      expect(configuration({ env })).to.be.defined;
    });
  });
});
