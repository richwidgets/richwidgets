define(['widget-test-base', 'ckeditor', 'src/widgets/input/editor'], function (base, CKEDITOR) {
    ddescribe('widget(editor): widget functions', function () {

        //basic editor
        var fixtureBasic, elementBasic;
        //inline editor
        var fixtureInline, elementInline;

        beforeEach(function () {
            var f = jasmine.getFixtures();
            f.load('test/widgets/input/editor-functions-test.html');

            //locate basic editor elements
            fixtureBasic = $('#fixture-basic-editor');
            elementBasic = $('textarea', fixtureBasic);

            // locate inline editor elements
            fixtureInline = $('#fixture-inline-editor');
            elementInline = $('div', fixtureInline);

        });

        describe('Function value:', function () {
            it('setting new value', function () {
                var instanceReady = false;
                var editorValueSet = false;
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
                    elementBasic.editor('value', 'new content', function() {
                      editorValueSet = true;
                    });
                });

                waitsFor(function() {
                    return editorValueSet;
                }, 'editor value to be set', 2000);

                runs(function() {
                    expect($(elementBasic.editor('value')).text()).toBe('new content');

                    CKEDITOR.on('instanceDestroyed', function() {
                        instanceDestroyed = true;
                    });

                    elementBasic.editor('destroy');
                });

                waitsFor(function() {
                    return instanceDestroyed;
                }, 'instance to be destroyed', 1000);
            });

            it('getting value', function () {
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
                    expect($(elementBasic.editor('value')).text()).toBe('Content of textarea');

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

        describe('Function editor:', function () {
            it('should return instance of CKEditor', function () {
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
                    var editor = elementBasic.editor('editor');
                    //assert its instance of CDEditor by using some of its functions
                    editor.setReadOnly(true);
                    expect(elementBasic.editor('readOnly')).toBe(true);

                    expect(editor.getData()).toContain('Content of textarea');

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

        describe('Function focus:', function () {
            it('sets focus to editor', function () {
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
                    expect(elementBasic.editor('isFocused')).toBe(false);
                    //set focus
                    elementBasic.editor('focus');
                    //assert it is focused
                    expect(elementBasic.editor('isFocused')).toBe(true);

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

        describe('Function isDirty:', function () {
            it('default should be false, after change should be true', function () {
                var instanceReady = false;
                var instanceDestroyed = false;
                var editorValueSet = false;

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
                    //default should be false
                    expect(elementBasic.editor('isDirty')).toBe(false);
                    //trigger change
                    elementBasic.editor('value', 'new content', function() {
                        editorValueSet = true;
                    });
                });

                waitsFor(function() {
                    return editorValueSet;
                }, 'editor value to be set', 2000);

                runs(function() {
                    // isDirty should now be true - there was a change since last focus event
                    expect(elementBasic.editor('isDirty')).toBe(true);

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

        describe('Function isValueChanged:', function () {
            it('default should be false, after change should be true', function () {
                var instanceReady = false;
                var instanceDestroyed = false;
                var editorValueSet = false;

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
                    //default should be false
                    expect(elementBasic.editor('isValueChanged')).toBe(false);
                    //trigger change
                    elementBasic.editor('value', 'new content', function() {
                        editorValueSet = true;
                    });
                });

                waitsFor(function() {
                    return editorValueSet;
                }, 'editor value to be set', 2000);

                runs(function() {
                    // isValueChanged should now be true - there was a change from initial state
                    expect(elementBasic.editor('isValueChanged')).toBe(true);

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

        describe('Function readOnly[readOnly]:', function () {
            it('set readOnly mode in editor', function () {
                var instanceReady = false;
                var instanceDestroyed = false;
                var editorValueSet = false;

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
                    //default should be false
                    expect(elementBasic.editor('readOnly')).toBe(false);
                    //trigger change
                    elementBasic.editor('value', 'Blah blah', function() {
                        editorValueSet = true;
                    });
                });

                waitsFor(function() {
                    return editorValueSet;
                }, 'editor value to be set', 2000);

                runs(function() {
                    expect($(elementBasic.editor('value')).text()).toBe('Blah blah');
                    //set readOnly mode
                    elementBasic.editor('readOnly', true);
                    expect(elementBasic.editor('readOnly')).toBe(true);
                    //set back to writeable mode and check
                    elementBasic.editor('readOnly', false);
                    expect(elementBasic.editor('readOnly')).toBe(false);

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

        describe('Function blur:', function () {
            it('removes focus from editor', function () {
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
                    //set focus to editor
                    elementBasic.editor('focus');
                    //assert it is focused
                    expect(elementBasic.editor('isFocused')).toBe(true);
                    //blur
                    elementBasic.editor('blur');
                    //assert it is no longer focused
                    expect(elementBasic.editor('isFocused')).toBe(false);

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