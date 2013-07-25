define(['test/utils/jasmine-toHaveEqualDom'], function () {

  beforeEach(function () {
    var f = jasmine.getFixtures();
    f.fixturesPath = 'base';
  });

  afterEach(function () {
    var f = jasmine.getFixtures();
    f.cleanUp();
    f.clearCache();
  });

  return {
    loadFixture: function(src) {
      jasmine.getFixtures().load(src);
    }
  };

});