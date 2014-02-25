define(['widget-test-base', 'ckeditor', 'src/widgets/input/editor'], function (base, CKEDITOR) {
    describe('widget(editor): widget functions', function () {

        beforeEach(function () {
            var f = jasmine.getFixtures();
            f.load('test/widgets/input/editor-functions-test.html');

            ///inline editor elements
            //var fixtureInline = $('#fixture-inline-editor');
            //var elementInline = $('div', fixtureInline);

        });

        describe('value:', function () {
            iit('this is some test decsription...', function () {
                var fixtureBasic = $('#fixture-basic-editor');
                var elementBasic = $('textarea', fixtureBasic);
                var instanceReady = false;
                var instanceDestroyed = false;

                runs(function() {
                    // when
                    elementBasic
                        .editor()
                        .on('editorinit', function() {
                            instanceReady = true;
                        });
                });

                waitsFor(function() {
                    return instanceReady;
                }, 'instance to be ready', 1000);

                runs(function() {
                    elementBasic.editor('value', 'new content');
                    debugger;
                    //expect($(elementBasic.editor('value')).text()).toBe('new content');
                    expect(elementBasic.editor('value')).toEqual('new content');
                    CKEDITOR.on('instanceDestroyed', function() {
                        instanceDestroyed = true;
                    });

                    elementBasic.editor('destroy');
                });

                waitsFor(function() {
                    return instanceDestroyed;
                }, 'instance to be destroyed', 1000);
            });

        });

        describe('editor:', function () {
            it('this is some test decsription...', function () {

            });

        });

        describe('focus:', function () {
            it('this is some test decsription...', function () {

            });

        });

        describe('isDirty:', function () {
            it('this is some test decsription...', function () {

            });

        });

        describe('isValueChanged:', function () {
            it('this is some test decsription...', function () {

            });

        });

        describe('readOnly[readOnly]:', function () {
            it('this is some test decsription...', function () {

            });

        });

        describe('blur:', function () {
            it('some description', function () {

            });
        });
    });
});