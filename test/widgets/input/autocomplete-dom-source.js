define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/input/autocomplete'], function () {

  describe("widget(autocomplete): DOM source", function () {

    beforeEach(function () {
      var f = jasmine.getFixtures();
      f.load('test/widgets/input/autocomplete-dom-source.html');

      var s = jasmine.getStyleFixtures();
      s.load('dist/assets/bootstrap/bootstrap.css');
      s.load('dist/assets/font-awesome/font-awesome.css');
      s.load('dist/assets/richfaces/input/autocomplete.css');
    });



    it("suggestions from <list> markup", function () {
      // given
      var fixture = $("#fixture-autocomplete-with-list")
      var element = $("input", fixture);
      var expected = $("#expected-autocomplete-with-list");

      // when
      element.richAutocomplete({ source: $('ul', fixture).get(0) });

      // then
      expect(fixture).toHaveEqualDom(expected);
    });



    it("suggestions from <table> markup", function () {
      // given
      var fixture = $("#fixture-autocomplete-with-table")
      var element = $("input", fixture);
      var expected = $("#expected-autocomplete-with-table");

      // when
      element.richAutocomplete({ source: $('table', fixture).get(0) });

      // then
      expect(fixture).toHaveEqualDom(expected);
    });

  });

});