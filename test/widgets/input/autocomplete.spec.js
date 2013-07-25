define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/input/autocomplete'], function (wt) {

  var Syn = wt.Syn;

  describe("Widget: Autocomplete", function () {

    var fixture, element;



    beforeEach(function () {
      var f = jasmine.getFixtures();
      f.load('test/widgets/input/autocomplete.spec.html');

      var s = jasmine.getStyleFixtures();
      s.load('dist/assets/bootstrap/bootstrap.css');
      s.load('dist/assets/font-awesome/font-awesome.css');
      s.load('dist/assets/richfaces/input/autocomplete.css');

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



    it("can be destructed", function () {
      // given
      var expected = $("#expected");
      var initialDom = expected.html();

      // construct element
      element.richAutocomplete({
        source: ['Java', 'Haskell']
      });
      expect(fixture).toHaveEqualDom(expected);

      // when
      element.richAutocomplete('option', 'disabled');

      // then
      expect(fixture).toHaveEqualDom($('<body>').html(initialDom));
    });



    it("can have button", function () {
      // given
      var expected = $("#expected-with-button");

      // when
      element.richAutocomplete({
        source: ['Java', 'Haskell'],
        showButton: true
      });

      // then
      expect(fixture).toHaveEqualDom(expected);
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
        Syn.type('j', element);
      });

      waitsFor(function() {
        var item = menu.find(".ui-menu-item");
        return item.length == 1 && item.text() === 'Java';
      }, "menu should contain one item", 500);

      runs(function() {
        Syn.click(menu.find(".ui-menu-item").get(0));
      });

      waitsFor(function() {
        return menu.is(':not(:visible)');
      }, "menu should not be visible", 1500);

      runs(function() {
        expect(element).toHaveValue("Java, ");

        Syn.type('h', element);
      });

      waitsFor(function() {
        var item = menu.find(".ui-menu-item");
        return item.length == 1 && item.text() === 'Haskell';
      }, "menu should contain one item", 500);

      runs(function() {
        Syn.click(menu.find(".ui-menu-item").get(0));
      });

      waitsFor(function() {
        return menu.is(':not(:visible)');
      }, "menu should not be visible", 1500);

      runs(function() {
        expect(element).toHaveValue("Java, Haskell, ");
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
    };

  });

});