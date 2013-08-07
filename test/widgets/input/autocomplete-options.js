define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/input/autocomplete', 'jquery-simulate'], function () {

  var key = jQuery.simulate.keyCode;

  describe("widget(autocomplete): options", function () {

    var fixture, element;

    beforeEach(function () {
      var s = jasmine.getStyleFixtures();
      s.load('dist/assets/bootstrap/bootstrap.css');
      s.load('dist/assets/font-awesome/font-awesome.css');
      s.load('dist/assets/richfaces/input/autocomplete.css');

      fixture = $('<div id="widget-test-base-fixture"></div>').appendTo($('body'));

      element = $('<input type="text"/>').appendTo(fixture);
    });

    afterEach(function() {
      element.richAutocomplete('destroy');
      fixture.remove();
    });




    it("calls 'update' when input changes and before DOM-based suggestions are updated", function() {
      var updateCalled = false;
      var request;

      var source = $("<ul><li>Java</li><li>Haskell</li></ul>").after(element).get(0);

      // given
      element.richAutocomplete({
        source: source,
        token: ',',
        update: function(r) {
          request = r;
          updateCalled = true;
        }
      });

      var menu = element.autocomplete( "widget" );

      // when
      runs(function() {
        element.val('j');
        element.trigger('keydown');
      });

      waitsFor(function() {
        return menu.is(':visible');
      }, "menu to be visible", 500);

      runs(function() {
        expect(updateCalled).toBe(true);
        expect(request).toEqual({ term: 'j'});
      });
    });




    it("supports 'minLength'", function() {

      var sourceFnInvoked = 0;
      var keydownEventsPropagated = 0;

      element.richAutocomplete({
        minLength: 3,
        source: function (request, response) {
          sourceFnInvoked += 1;
          response($.ui.autocomplete.filter(['Java', 'Haskell'], request.term));
        }
      });

      element.on("keydown", function() {
        keydownEventsPropagated += 1;
      });

      var menu = element.autocomplete( "widget" );

      // when
      runs(function() {
        element.val('j');
        element.trigger('keydown');
      });

      waitsFor(function() {
        return keydownEventsPropagated == 1;
      }, "menu to be visible", 500);

      runs(function() {
        element.val('ja');
        element.trigger('keydown');
      });

      waitsFor(function() {
        return keydownEventsPropagated == 2;
      }, "menu to be visible", 500);

      runs(function() {
        // first call of search
        element.val('jav');
        element.trigger('keydown');
      });

      waitsFor(function() {
        return sourceFnInvoked == 1;
      }, "menu to be visible", 500);

      runs(function() {
        expect(menu).toBeVisible();
        expect(keydownEventsPropagated).toBe(3);

        // second call of search
        element.val('java');
        element.trigger('keydown');
      });

      waitsFor(function() {
        return sourceFnInvoked == 2;
      }, "menu to be visible", 500);

      runs(function() {
        expect(keydownEventsPropagated).toBe(4);
      });
    });




    it("uses 'cache' when two searches are triggered for same prefix", function() {
      var sourceFnInvoked = false;

      element.richAutocomplete({
        cached: true,
        minLength: 2,
        source: function (request, response) {
          sourceFnInvoked = true;
          response($.ui.autocomplete.filter(['Java', 'Haskell'], request.term));
        }
      });

      var menu = element.autocomplete( "widget" );

      // when
      runs(function() {
        element.val('ja');
        element.trigger('keydown');
      });

      waitsFor(function() {
        return menu.is(':visible');
      }, "menu to be visible", 500);

      runs(function() {
        expect(sourceFnInvoked).toBe(true);
        sourceFnInvoked = false;

        element.val('');
        element.trigger('keydown');
      });

      waitsFor(function() {
        return menu.is(':hidden');
      }, "menu to be visible", 500);

      runs(function() {
        element.val('ja');
        element.trigger('keydown');
      });

      waitsFor(function() {
        return menu.is(':visible');
      }, "menu to be visible", 500);

      runs(function() {
        expect(sourceFnInvoked).toBe(false);

        element.val('');
        element.trigger('keydown');
      });

    });




    it("supports 'autoFill' option", function() {

      element.richAutocomplete({
        autoFill: true,
        source: ['Java', 'Haskell']
      });

      var menu = element.autocomplete( "widget" );

      // when
      runs(function() {
        element.val('ja');
        element.trigger('keydown');
      });

      waitsFor(function() {
        return menu.is(':visible');
      }, "menu to be visible", 500);

      runs(function() {
        expect(element).toHaveValue("ja");

        element.simulate('keydown', { keyCode: key.DOWN });
      });

      waitsFor(function() {
        return menu.find(".ui-menu-item a").is(".ui-state-focus");
      }, "first item to be selected", 1000);

      runs(function() {
        expect(element).toHaveValue("java");
      });

    });




    it("supports 'autoFocus' option", function() {

      element.richAutocomplete({
        autoFocus: true,
        source: ['Java', 'Haskell']
      });

      var menu = element.autocomplete( "widget" );

      // when
      runs(function() {
        element.val('ja');
        element.trigger('keydown');
      });

      waitsFor(function() {
        return menu.is(':visible');
      }, "menu to be visible", 500);

      runs(function() {
        expect(menu).toContain(".ui-menu-item a.ui-state-focus");
      });

    });




    it("allows to use both 'autoFocus' and 'autoFill' simultaneously", function() {

      element.richAutocomplete({
        autoFocus: true,
        autoFill: true,
        source: ['Java', 'Haskell']
      });

      var menu = element.autocomplete( "widget" );

      // when
      runs(function() {
        element.val('ja');
        element.trigger('keydown');
      });

      waitsFor(function() {
        return menu.is(':visible');
      }, "menu to be visible", 500);

      runs(function() {
        expect(menu).toContain(".ui-menu-item a.ui-state-focus");
        expect(element).toHaveValue("java");
      });

    });




    it("doesn't pre-fill a value when both 'autoFocus' and 'autoFill' are used and first option is selected after opening menu", function() {

      element.richAutocomplete({
        autoFocus: true,
        autoFill: true,
        source: ['Java', 'Haskell']
      });

      var menu = element.autocomplete( "widget" );

      // when
      runs(function() {
        element.val('a');
        element.trigger('keydown');
      });

      waitsFor(function() {
        return menu.is(':visible');
      }, "menu to be visible", 500);

      runs(function() {
        expect(menu).toContain(".ui-menu-item a.ui-state-focus");
        expect(element).toHaveValue("a");
      });

    });



    it("pre-fills value which replaces whole input when both 'autoFocus' and 'autoFill' are used and second option is selected", function() {

      element.richAutocomplete({
        autoFocus: true,
        autoFill: true,
        source: ['Java', 'Haskell']
      });

      var menu = element.autocomplete( "widget" );

      // when
      runs(function() {
        element.val('a');
        element.trigger('keydown');
      });

      waitsFor(function() {
        return menu.is(':visible');
      }, "menu to be visible", 500);

      runs(function() {
        expect(element).toHaveValue("a");
        expect(menu.find(".ui-menu-item:first a")).toBe(".ui-state-focus");
        expect(menu.find(".ui-menu-item:first a")).toHaveText("Java");

        element.simulate('keydown', { keyCode: key.DOWN });
      });

      waitsFor(function() {
        return element.val() == 'Haskell';
      }, "menu to be visible", 1500);

      runs(function() {
        expect(element).toHaveValue("Haskell");
        expect(menu.find(".ui-menu-item:nth-child(2) a")).toBe(".ui-state-focus");
        expect(menu.find(".ui-menu-item:nth-child(2) a")).toHaveText("Haskell");
      });

    });

  });

});