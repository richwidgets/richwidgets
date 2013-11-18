define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/input/autocomplete'], function () {

  describe('widget(autocomplete): DOM source', function () {

    beforeEach(function () {
      var f = jasmine.getFixtures();
      f.load('test/widgets/input/autocomplete-dom-source--table.html');

      var s = jasmine.getStyleFixtures();
      s.appendLoad('dist/assets/bootstrap/bootstrap.css');
      s.appendLoad('dist/assets/font-awesome/font-awesome.css');
      s.appendLoad('dist/assets/richwidgets/input/autocomplete.css');
    });



    it('suggestions from <table> markup', function () {
      // given
      var fixture = $('#fixture-autocomplete-with-table');
      var element = $('input', fixture);
      var expected = $('#expected-autocomplete-with-table').detach();
      var expectedMenu = $('#expected-autocomplete-with-table--menu').detach();

      // make sure the dimensions are equal across all browsers
      element.width('400');
      element.height('20');

      // when
      element.autocomplete({ source: $('table', fixture).get(0) });
      var menu = element.autocomplete( 'widget' );

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
      }, 'menu should be visible', 1000);

      runs(function() {
        expect(menu).toBeVisible();

        expect(menu).toHaveEqualInnerDom(expectedMenu.children().first(), { ignoreSequenceIdDifference: true });

        element.autocomplete('destroy');
        fixture.remove();
      });
    });

  });

});
