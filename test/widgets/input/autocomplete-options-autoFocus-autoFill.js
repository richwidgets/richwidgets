define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/input/autocomplete', 'jquery-simulate'], function () {

  var key = jQuery.simulate.keyCode;

  describe("widget(autocomplete): autoFocus / autoFill options", function () {

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



    it("autoFill doesn't pre-fill values which doesn't start with lower-cased prefix", function() {

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
        return menu.find(".ui-menu-item:nth-child(2) a").is(".ui-state-focus");
      }, "menu to be visible", 1500);

      runs(function() {
        expect(element).toHaveValue("a");
        expect(menu.find(".ui-menu-item:nth-child(2) a")).toBe(".ui-state-focus");
        expect(menu.find(".ui-menu-item:nth-child(2) a")).toHaveText("Haskell");
      });

    });




    it("when autoFill doesn't match a value on beginning of search, nothing is pre-filled, but when a valid option is focused, it is pre-filled", function() {

      element.richAutocomplete({
        autoFocus: true,
        autoFill: true,
        source: ['Clojure', 'Java', 'JavaScript']
      });

      var menu = element.autocomplete( "widget" );

      // when
      runs(function() {
        element.val('j');
        element[0].setSelectionRange(1, 1);
        element.trigger('keydown');
      });

      waitsFor(function() {
        return menu.is(':visible');
      }, "menu to be visible", 500);

      runs(function() {
        expect(element).toHaveValue("j");
        expect(menu.find(".ui-menu-item:first a")).toBe(".ui-state-focus");
        expect(menu.find(".ui-menu-item:first a")).toHaveText("Clojure");

//        element.simulate('keydown', { keyCode: key.DOWN });
        element.val('ja');
        element[0].setSelectionRange(2, 2);
        element.trigger('keydown');
      });

      waitsFor(function() {
        return element.val() === 'java';
      }, "'java' is auto-filled word", 1500);

      runs(function() {
        expect(element[0].selectionStart).toBe(2);
        expect(element[0].selectionEnd).toBe(4);
        expect(menu.find(".ui-menu-item:first a")).toBe(".ui-state-focus");
        expect(menu.find(".ui-menu-item:first a")).toHaveText("Java");

        element.val('jav');
        element[0].setSelectionRange(3, 3);
        element.trigger('keydown');
      });

      waitsFor(function() {
        var el = element[0];
        return 1 === Math.abs(el.selectionEnd - el.selectionStart);
      }, "only last char is selected from input", 1500);

      runs(function() {
        expect(element).toHaveValue("java");
        expect(element[0].selectionStart).toBe(3);
        expect(element[0].selectionEnd).toBe(4);
        expect(menu.find(".ui-menu-item:first a")).toBe(".ui-state-focus");
        expect(menu.find(".ui-menu-item:first a")).toHaveText("Java");
      });

    });




    it("'autoFill' handles backspace correctly", function() {

      element.richAutocomplete({
        autoFocus: true,
        autoFill: true,
        source: ['Clojure', 'Java', 'JavaScript']
      });

      var menu = element.autocomplete( "widget" );

      // when
      runs(function() {
        element.val('javas');
        element[0].setSelectionRange(10, 10);
        element.trigger('keydown');
      });

      waitsFor(function() {
        return menu.is(':visible');
      }, "menu to be visible", 500);

      runs(function() {
        expect(menu.find(".ui-menu-item:first a")).toBe(".ui-state-focus");
        expect(menu.find(".ui-menu-item:first a")).toHaveText("JavaScript");

        element[0].value = 'java';
        element.simulate("keydown", { keyCode: key.BACKSPACE });
      });

      waitsFor(function() {
        return menu.find(".ui-menu-item:first a").text() === 'Java';

      }, "first item to be 'Java'", 500);

      runs(function() {
        expect(menu.find(".ui-menu-item:first a")).toBe(".ui-state-focus");
        expect(menu.find(".ui-menu-item:first a")).toHaveText("Java");

        expect(menu.find(".ui-menu-item:nth-child(2) a")).not.toBe(".ui-state-focus");
        expect(menu.find(".ui-menu-item:nth-child(2) a")).toHaveText("JavaScript");
      });

    });

  });

});