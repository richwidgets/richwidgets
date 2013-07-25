define(['widget-testing-base', 'jquery', 'jquery-ui', 'src/widgets/input/autocomplete'], function (domCompare) {

  describe("Widget: Autocomplete", function () {

    beforeEach(function () {
      var f = jasmine.getFixtures();
      f.load('test/widgets/input/autocomplete.spec.html');
    });

    afterEach(function () {
      var f = jasmine.getFixtures();
      f.cleanUp();
      f.clearCache();
    });

    it("initializes DOM correctly", function () {

      var fixture = $("#fixture");
      var expected = $("#expected");

      var element = $(".autocomplete", fixture);


      element.richAutocomplete({ source: ['Java', 'Haskell'] });
      expect(fixture).toHaveEqualDom(expected);
    });

  });

});