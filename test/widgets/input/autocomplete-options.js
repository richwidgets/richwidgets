define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/input/autocomplete'], function () {

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
      }, "menu to be visible", 1500);

      runs(function() {
        expect(updateCalled).toBe(true);
        expect(request).toEqual({ term: 'j'});
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
      }, "menu to be visible", 1500);

      runs(function() {
        expect(sourceFnInvoked).toBe(true);
        sourceFnInvoked = false;

        element.val('');
        element.trigger('keydown');
      });

      waitsFor(function() {
        return menu.is(':hidden');
      }, "menu to be visible", 1500);

      runs(function() {
        element.val('ja');
        element.trigger('keydown');
      });

      waitsFor(function() {
        return menu.is(':visible');
      }, "menu to be visible", 1500);

      runs(function() {
        expect(sourceFnInvoked).toBe(false);

        element.val('');
        element.trigger('keydown');
      });

    });

  });

});