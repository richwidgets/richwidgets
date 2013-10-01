define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/input/autocomplete', 'jquery-simulate'], function () {

  var key = jQuery.simulate.keyCode;

  describe("widget(autocomplete): options", function () {

    var fixture, element;

    beforeEach(function () {
      var s = jasmine.getStyleFixtures();
      s.appendLoad('dist/assets/bootstrap/bootstrap.css');
      s.appendLoad('dist/assets/font-awesome/font-awesome.css');
      s.appendLoad('dist/assets/richfaces/input/autocomplete.css');

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

  });

});