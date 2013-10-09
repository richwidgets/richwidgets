define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/input/autocomplete'], function () {

  describe("widget(autocomplete): interaction", function () {

    var fixture, element;



    beforeEach(function () {
      var s = jasmine.getStyleFixtures();
      s.appendLoad('dist/assets/bootstrap/bootstrap.css');
      s.appendLoad('dist/assets/font-awesome/font-awesome.css');
      s.appendLoad('dist/assets/richwidgets/input/autocomplete.css');

      fixture = $('<div id="widget-test-base-fixture"></div>').appendTo($('body'));

      element = $('<input type="text"/>').appendTo(fixture);
    });

    afterEach(function() {
      element.richAutocomplete('destroy');
      fixture.remove();
    });



    it("interacts with JSON-fed autocomplete", function() {
      // given
      element.richAutocomplete({ source: ['Java', 'Haskell'] });

      // then
      testInteraction();
    });



    it("interacts with autocomplete using function as a source", function() {
      // given
      element.richAutocomplete({
        source: function (request, response) {
          response($.ui.autocomplete.filter(['Java', 'Haskell'], request.term));
        }
      });

      // then
      testInteraction();
    });



    it("handles delayed response", function() {
      // given
      element.richAutocomplete({
        source: function (request, response) {
          setTimeout(function () {
            response($.ui.autocomplete.filter(['Java', 'Haskell'], request.term));
          }, 100);
        }
      });

      // then
      testInteraction();

    });



    it("supports tokenizing", function() {
      // given
      element.richAutocomplete({
        source: ['Java', 'Haskell'],
        token: ','
      });

      var menu = element.autocomplete( "widget" );

      // when
      runs(function() {
        element.val('j');
        element.trigger('keydown');
      });

      waitsFor(function() {
        var item = menu.find(".ui-menu-item");
        return item.length == 1 && item.text() === 'Java';
      }, "menu should contain one item", 500);

      runs(function() {
        menu.find(".ui-menu-item").trigger("click");
      });

      waitsFor(function() {
        return menu.is(':not(:visible)');
      }, "menu should not be visible", 1500);

      runs(function() {
        expect(element).toHaveValue("Java");

        element.val(element.val() + ', h');
        element.trigger('keydown');
      });

      waitsFor(function() {
        var item = menu.find(".ui-menu-item");
        return item.length == 1 && item.text() === 'Haskell';
      }, "menu should contain one item", 500);

      runs(function() {
        menu.find(".ui-menu-item").trigger("click");
      });

      waitsFor(function() {
        return menu.is(':not(:visible)');
      }, "menu should not be visible", 1500);

      runs(function() {
        expect(element).toHaveValue("Java, Haskell");
      });
    });



    /**
     * Tests that we can interact with the input:
     * types into input and checks expected output
     */
    function testInteraction() {
      var menu = element.autocomplete( "widget" );

      runs(function() {
        expect(menu).toBeHidden();
        expect(menu).toBeEmpty();

//        Syn.type('j', element);
        element.val('j');
        element.trigger('keydown');
      });

      waitsFor(function() {
        return menu.is(':visible');
      }, "menu should be visible", 1000);

      runs(function() {
        expect(menu).toBeVisible();

        var items = menu.find(".ui-menu-item");
        expect(items).toExist();
        expect(items).toHaveLength(1);
        expect(items.get(0)).toHaveText('Java');

        element.val('');
        element.trigger('keydown');
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

        element.val('Hask');
        element.trigger('keydown');
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
    };

  });

});