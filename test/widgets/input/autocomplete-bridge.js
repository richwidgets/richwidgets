define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/input/autocompleteBridge'], function (wt) {

  var Syn = wt.Syn;

  describe("widget(autocomplete): bridge", function () {

    beforeEach(function () {
      var f = jasmine.getFixtures();
      f.load('test/widgets/input/autocomplete-bridge.html');

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
      element.richAutocompleteBridge({ choices: $('ul', fixture).get(0) });

      // then
      expect(fixture).toHaveEqualDom(expected);
    });



    it("suggestions from <table> markup", function () {
      // given
      var fixture = $("#fixture-autocomplete-with-table")
      var element = $("input", fixture);
      var expected = $("#expected-autocomplete-with-table");

      // when
      element.richAutocompleteBridge({ choices: $('table', fixture).get(0) });

      // then
      expect(fixture).toHaveEqualDom(expected);
    });

  });

});