define(['widget-test-base', 'ckeditor', 'src/widgets/input/editor'], function (base, CKEDITOR) {
    describe('widget(editor): widget properties', function () {

        //basic editor
        var fixtureBasic, elementBasic;

        beforeEach(function () {
            var f = jasmine.getFixtures();
            f.load('test/widgets/input/editor-test.html');

            //locate basic editor elements
            fixtureBasic = $('#fixture-basic-editor');
            elementBasic = $('textarea', fixtureBasic);
        });

        describe('Property affects the toolbar generated:', function () {
            it('creating basic (eg. default) toolbar in editor', function () {
                var instanceReady = false;
                var editorValueSet = false;
                var instanceDestroyed = false;

                runs(function() {
                    // when
                    elementBasic
                        .editor({
                            toolbar: 'Basic'
                        })
                        .on('editorinit', function() {
                            instanceReady = true;
                        });
                });

                waitsFor(function() {
                    return instanceReady;
                }, 'instance to be ready', 1000);

                runs(function() {
                    elementBasic.editor('value', 'new content', function() {
                        editorValueSet = true;
                    });
                });

                waitsFor(function() {
                    return editorValueSet;
                }, 'editor value to be set', 2000);

                runs(function() {
                    //basic should have 6 buttons
                    expect($('#fixture-basic-editor .cke_toolbox .cke_button').length).toBe(6);
                    CKEDITOR.on('instanceDestroyed', function() {
                        instanceDestroyed = true;
                    });

                    elementBasic.editor('destroy');
                });

                waitsFor(function() {
                    return instanceDestroyed;
                }, 'instance to be destroyed', 1000);
            });

            it('creating full toolbar in editor', function () {
                var instanceReady = false;
                var editorValueSet = false;
                var instanceDestroyed = false;

                runs(function() {
                    // when
                    elementBasic
                        .editor({
                            toolbar: 'Full'
                        })
                        .on('editorinit', function() {
                            instanceReady = true;
                        });
                });

                waitsFor(function() {
                    return instanceReady;
                }, 'instance to be ready', 1000);

                runs(function() {
                    elementBasic.editor('value', 'new content', function() {
                        editorValueSet = true;
                    });
                });

                waitsFor(function() {
                    return editorValueSet;
                }, 'editor value to be set', 2000);

                runs(function() {
                    //full should have 60 buttons
                    expect($('#fixture-basic-editor .cke_toolbox .cke_button').length).toBe(62);
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
    });
});
