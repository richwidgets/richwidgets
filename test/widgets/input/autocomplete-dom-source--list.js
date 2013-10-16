define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/input/autocomplete'], function () {

  describe("widget(autocomplete): DOM source", function () {

    beforeEach(function () {
      var f = jasmine.getFixtures();
      f.load('test/widgets/input/autocomplete-dom-source--list.html');

      var s = jasmine.getStyleFixtures();
      s.appendLoad('dist/assets/bootstrap/bootstrap.css');
      s.appendLoad('dist/assets/font-awesome/font-awesome.css');
      s.appendLoad('dist/assets/richwidgets/input/autocomplete.css');
    });



    it("suggestions from <list> markup", function () {
      // given
      var fixture = $("#fixture-autocomplete-with-list");
      var element = $("input", fixture);
      var expected = $("#expected-autocomplete-with-list").detach();
      var expectedMenu = $("#expected-autocomplete-with-list--menu").detach();

      // make sure the dimensions are equal across all browsers
      element.width('200');
      element.height('20');

      // when
      element.richAutocomplete({ source: $('ul', fixture).get(0) });
      var menu = element.autocomplete( "widget" );

      // then
      expect(fixture).toHaveEqualInnerDom(expected);

      runs(function() {
        expect(menu).toBeHidden();
        expect(menu).toBeEmpty();

        element.val('');
        element.trigger('keydown');
      });

      waitsFor(function() {
        return menu.is(':visible');
      }, "menu should be visible", 1000);

      runs(function() {
        expect(menu).toBeVisible();

        expect(menu).toHaveEqualOuterDom(expectedMenu.children().first());

        element.richAutocomplete('destroy');
        fixture.remove();
      });
    });

  });

});
