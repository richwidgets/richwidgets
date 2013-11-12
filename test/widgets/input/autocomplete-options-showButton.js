define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/input/autocomplete', 'jquery-simulate'], function () {

  describe('widget(autocomplete): showButton option', function () {

    var fixture, input;

    beforeEach(function () {
      var s = jasmine.getStyleFixtures();
      s.appendLoad('dist/assets/bootstrap/bootstrap.css');
      s.appendLoad('dist/assets/font-awesome/font-awesome.css');
      s.appendLoad('dist/assets/richwidgets/input/autocomplete.css');

      fixture = $('<div id="widget-test-base-fixture"></div>').appendTo($('body'));

      input = $('<input type="text"/>').appendTo(fixture);
    });

    afterEach(function() {
      input.autocomplete('destroy');
      fixture.remove();
    });



    it('should have button ininitial state', function() {
      var source = ['Java', 'Haskell'];

      // given
      input.autocomplete({
        source: source,
        showButton: true
      });

      var button = fixture.find('button');

      // then
      expect(button).toContain('i.fa.fa-chevron-down');
    });



    it('opens menu on button click', function() {
      var source = ['Java', 'Haskell'];

      // given
      input.autocomplete({
        source: source,
        showButton: true
      });

      var menu = input.autocomplete( 'widget' );
      var button = fixture.find('button');

      // when
      runs(function() {
        button.click();
      });

      waitsFor(function() {
        return menu.is(':visible');
      }, 'menu to be visible', 500);

      runs(function() {
        // then
        expect(input).toBe(document.activeElement);
        expect(button).toContain('i.fa.fa-chevron-up');
      });
    });



    it('closes menu on blur', function() {
      var source = ['Java', 'Haskell'];

      // given
      input.autocomplete({
        source: source,
        showButton: true
      });

      var menu = input.autocomplete( 'widget' );
      var button = fixture.find('button');

      // when
      runs(function() {
        button.click();
      });

      waitsFor(function() {
        return menu.is(':visible');
      }, 'menu to be visible', 500);

      runs(function() {
        button.focus();
        button.click();
      });

      waitsFor(function() {
        return menu.is(':not(:visible)');
      }, 'menu to hide', 500);

      runs(function() {
        // then
        expect(input).not.toBe(document.activeElement);
        expect(button).toContain('i.fa.fa-chevron-down');
      });
    });







    it('menu can be opened again after closing', function() {
      var source = ['Java', 'Haskell'];

      // given
      input.autocomplete({
        source: source,
        showButton: true
      });

      var menu = input.autocomplete( 'widget' );
      var button = fixture.find('button');

      // when
      runs(function() {
        button.click();
      });

      waitsFor(function() {
        return menu.is(':visible');
      }, 'menu to be visible', 500);

      runs(function() {
        button.focus();
        button.click();
      });

      waitsFor(function() {
        return menu.is(':not(:visible)');
      }, 'menu to hide', 500);

      runs(function() {
        setTimeout(function() {
          button.click();
        }, 250);
      });

      waitsFor(function() {
        return menu.is(':visible');
      }, 'menu to be visible again', 500);

      runs(function() {
        // then
        expect(input).toBe(document.activeElement);
        expect(button).toContain('i.fa.fa-chevron-up');
      });
    });

  });

});