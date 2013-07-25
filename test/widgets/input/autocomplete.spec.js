define(['widget-testing-base', 'jquery', 'jquery-ui', 'src/widgets/input/autocomplete'], function (wt) {

  describe("Widget: Autocomplete", function () {

    beforeEach(function () {
      wt.loadFixture('test/widgets/input/autocomplete.spec.html');
    });

    it("initializes DOM correctly", function () {
      // given
      var fixture = $("#fixture");
      var expected = $("#expected");
      var element = $(".autocomplete", fixture);

      // when
      element.richAutocomplete({ source: ['Java', 'Haskell'] });

      // then
      expect(fixture).toHaveEqualDom(expected);
    });

  });

});