define(['widget-testing-base', 'syn', 'jquery', 'jquery-ui', 'src/widgets/input/autocomplete'], function (wt, Syn) {

  describe("Widget: Autocomplete", function () {

    var fixture, element;

    beforeEach(function () {
      wt.loadFixture('test/widgets/input/autocomplete.spec.html');

      fixture = $("#fixture");
      element = $(".autocomplete", fixture);
    });

    it("initializes DOM correctly", function () {
      // given
      var expected = $("#expected");

      // when
      element.richAutocomplete({ source: ['Java', 'Haskell'] });

      // then
      expect(fixture).toHaveEqualDom(expected);
    });

    it("menu it opened when typing chars in", function() {
      // given
      element.richAutocomplete({ source: ['Java', 'Haskell'] });
      var menu = element.autocomplete( "widget" );

      expect(menu).toBeHidden();
      expect(menu).toBeEmpty();

      runs(function() {
        Syn.type('j', element);
      });

      waitsFor(function() {
        return menu.is(':visible');
      }, "menu should be visible", 500);

      runs(function() {
        expect(menu).toBeVisible();

        var items = menu.find(".ui-menu-item");
        expect(items).toExist();
        expect(items).toHaveLength(1);
        expect(items.get(0)).toHaveText('Java');

        Syn.key('\b', element);
      });

      waitsFor(function() {
        return menu.find(".ui-menu-item").length == 2;
      }, "menu should contain two items", 500);

      runs(function() {
        var items = menu.find(".ui-menu-item");
        expect(items).toExist();
        expect(items).toHaveLength(2);

        expect(items.get(0)).toHaveText('Java');
        expect(items.get(1)).toHaveText('Haskell');

        Syn.type('Hask', element);
      });

      waitsFor(function() {
        return menu.find(".ui-menu-item").length == 1;
      }, "menu should contain one item", 500);

      runs(function() {
        var items = menu.find(".ui-menu-item");
        expect(items).toExist();
        expect(items).toHaveLength(1);

        expect(items.get(0)).toHaveText('Haskell');
      });
    });

  });

});