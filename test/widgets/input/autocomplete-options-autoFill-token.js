define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/input/autocomplete', 'jquery-simulate'], function() {

    var key = jQuery.simulate.keyCode;

    describe('widget(autocomplete): autoFill / tokens options', function() {

        var fixture, input;

        beforeEach(function() {
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


        it('supports "autoFill" and "token" simultaneously', function() {

            input.autocomplete({
                autoFill: true,
                token: ',',
                source: ['Java', 'Haskell']
            });

            var menu = input.autocomplete('widget');



            runs(function() {
                appendTextToInput('ja');
            });

            waitsFor(function(){
                return menu.is(':visible');
            }, 'menu to be visible', 1000);

            runs(function() {
                expect(input).toHaveValue('ja');
                input.simulate('keydown', {keyCode: key.DOWN});
            });

            waitsFor(function() {
                return menu.find('.ui-menu-item:eq(0) a').is('.ui-state-focus');
            }, 'first item to be selected', 1000);

            runs(function() {
                expect(input).toHaveValue('java');
                menu.find('.ui-menu-item:eq(0)').trigger('click');
            });

            waitsFor(function(){
                return menu.is(':not(:visible)');
            }, 'menu should not be visible', 1000);

            runs(function() {
                expect(input).toHaveValue('Java');
                appendTextToInput(',h');
            });

            waitsFor(function(){
                return menu.is(':visible');
            }, 'menu to be visible', 1000);

            runs(function() {
                expect(input).toHaveValue('Java,h');
                input.simulate('keydown', {keyCode: key.DOWN});
            });

            waitsFor(function() {
                return menu.find('.ui-menu-item:eq(0) a').is('.ui-state-focus');
            }, 'first item to be selected', 1000);

            runs(function() {
                expect(input).toHaveValue('Java,haskell');

                menu.find('.ui-menu-item:eq(0)').trigger('click');
            });

            waitsFor(function(){
                return menu.is(':not(:visible)');
            }, 'menu should not be visible', 1000);

            runs(function() {
                expect(input).toHaveValue('Java, Haskell');
            });


            function appendTextToInput(text) {
                input.val(input.val() + text);
                input.trigger('keydown');
            }
        });

    });

});