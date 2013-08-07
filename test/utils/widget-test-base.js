define(['test/utils/jasmine-toHaveEqualDom'], function () {

  var fixtures;
  var styleFixtures;

  beforeEach(function () {
    fixtures = jasmine.getFixtures();
    fixtures.fixturesPath = 'base';

    styleFixtures = jasmine.getStyleFixtures();
    styleFixtures.fixturesPath = 'base';
  });

  afterEach(function () {
    fixtures.cleanUp();
    fixtures.clearCache();
  });

});