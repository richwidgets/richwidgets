define(['widget-test-base', 'ckeditor', 'src/widgets/input/editor'], function (base, CKEDITOR) {
    describe('widget(editor): widget functions', function () {

        //basic editor
        var fixtureBasic, elementBasic;
        //inline editor
        var fixtureInline, elementInline;

        beforeEach(function () {
            var f = jasmine.getFixtures();
            f.load('test/widgets/input/editor-test.html');

            //locate basic editor elements
            fixtureBasic = $('#fixture-basic-editor');
            elementBasic = $('textarea', fixtureBasic);

            // locate inline editor elements
            fixtureInline = $('#fixture-inline-editor');
            elementInline = $('div', fixtureInline);

        });

        describe('Function value:', function () {
            it('setting new value in basic editor', function () {
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

            it('setting new value in inline editor', function () {
                var instanceReady = false;
                var editorValueSet = false;
                var instanceDestroyed = false;

                runs(function() {
                    // when
                    elementInline
                        .editor()
                        .on('editorinit', function() {
                            instanceReady = true;
                        });
                });

                waitsFor(function() {
                    return instanceReady;
                }, 'instance to be ready', 1000);

                runs(function() {
                    elementInline.editor('value', 'new content', function() {
                        editorValueSet = true;
                    });
                });

                waitsFor(function() {
                    return editorValueSet;
                }, 'editor value to be set', 2000);

                runs(function() {
                    expect($(elementInline.editor('value')).text()).toBe('new content');

                    CKEDITOR.on('instanceDestroyed', function() {
                        instanceDestroyed = true;
                    });

                    elementInline.editor('destroy');
                });

                waitsFor(function() {
                    return instanceDestroyed;
                }, 'instance to be destroyed', 1000);
            });

            it('getting value in basic editor', function () {
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

            it('getting value in inline editor', function () {
                var instanceReady = false;
                var instanceDestroyed = false;

                runs(function() {
                    // when
                    elementInline
                        .editor()
                        .on('editorinit', function() {
                            instanceReady = true;
                        });
                });

                waitsFor(function() {
                    return instanceReady;
                }, 'instance to be ready', 1000);

                runs(function() {
                    expect($(elementInline.editor('value')).text()).toBe('Content of contenteditable');

                    CKEDITOR.on('instanceDestroyed', function() {
                        instanceDestroyed = true;
                    });

                    elementInline.editor('destroy');
                });

                waitsFor(function() {
                    return instanceDestroyed;
                }, 'instance to be destroyed', 1000);
            });
        });

        describe('Function editor:', function () {
            it('should return instance of CKEditor, basic editor', function () {
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

            it('should return instance of CKEditor, inline editor', function () {
                var instanceReady = false;
                var instanceDestroyed = false;

                runs(function() {
                    // when
                    elementInline
                        .editor()
                        .on('editorinit', function() {
                            instanceReady = true;
                        });
                });

                waitsFor(function() {
                    return instanceReady;
                }, 'instance to be ready', 1000);

                runs(function() {
                    var editor = elementInline.editor('editor');
                    //assert its instance of CDEditor by using some of its functions
                    editor.setReadOnly(true);
                    expect(elementInline.editor('readOnly')).toBe(true);

                    expect(editor.getData()).toContain('Content of contenteditable');

                    CKEDITOR.on('instanceDestroyed', function() {
                        instanceDestroyed = true;
                    });

                    elementInline.editor('destroy');
                });

                waitsFor(function() {
                    return instanceDestroyed;
                }, 'instance to be destroyed', 1000);
            });
        });

        describe('Function focus:', function () {
            it('sets focus to basic editor', function () {
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

            it('sets focus to inline editor', function () {
                var instanceReady = false;
                var instanceDestroyed = false;

                runs(function() {
                    // when
                    elementInline
                        .editor()
                        .on('editorinit', function() {
                            instanceReady = true;
                        });
                });

                waitsFor(function() {
                    return instanceReady;
                }, 'instance to be ready', 1000);

                runs(function() {
                    expect(elementInline.editor('isFocused')).toBe(false);
                    //set focus
                    elementInline.editor('focus');
                    //assert it is focused
                    expect(elementInline.editor('isFocused')).toBe(true);

                    CKEDITOR.on('instanceDestroyed', function() {
                        instanceDestroyed = true;
                    });

                    elementInline.editor('destroy');
                });

                waitsFor(function() {
                    return instanceDestroyed;
                }, 'instance to be destroyed', 1000);
            });

        });

        describe('Function isDirty:', function () {
            it('for basic editor, default should be false, after change should be true', function () {
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

            it('for inline editor, default should be false, after change should be true', function () {
                var instanceReady = false;
                var instanceDestroyed = false;
                var editorValueSet = false;

                runs(function() {
                    // when
                    elementInline
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
                    expect(elementInline.editor('isDirty')).toBe(false);
                    //trigger change
                    elementInline.editor('value', 'new content', function() {
                        editorValueSet = true;
                    });
                });

                waitsFor(function() {
                    return editorValueSet;
                }, 'editor value to be set', 2000);

                runs(function() {
                    // isDirty should now be true - there was a change since last focus event
                    expect(elementInline.editor('isDirty')).toBe(true);

                    CKEDITOR.on('instanceDestroyed', function() {
                        instanceDestroyed = true;
                    });

                    elementInline.editor('destroy');
                });

                waitsFor(function() {
                    return instanceDestroyed;
                }, 'instance to be destroyed', 1000);
            });
        });

        describe('Function isValueChanged:', function () {
            it('for basic editor, default should be false, after change should be true', function () {
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

            it('for inline editor, default should be false, after change should be true', function () {
                var instanceReady = false;
                var instanceDestroyed = false;
                var editorValueSet = false;

                runs(function() {
                    // when
                    elementInline
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
                    expect(elementInline.editor('isValueChanged')).toBe(false);
                    //trigger change
                    elementInline.editor('value', 'new content', function() {
                        editorValueSet = true;
                    });
                });

                waitsFor(function() {
                    return editorValueSet;
                }, 'editor value to be set', 2000);

                runs(function() {
                    // isValueChanged should now be true - there was a change from initial state
                    expect(elementInline.editor('isValueChanged')).toBe(true);

                    CKEDITOR.on('instanceDestroyed', function() {
                        instanceDestroyed = true;
                    });

                    elementInline.editor('destroy');
                });

                waitsFor(function() {
                    return instanceDestroyed;
                }, 'instance to be destroyed', 1000);
            });
        });

        describe('Function readOnly[readOnly]:', function () {
            it('for basic editor, set readOnly mode in editor', function () {
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

            it('for inlione editor, set readOnly mode in editor', function () {
                var instanceReady = false;
                var instanceDestroyed = false;
                var editorValueSet = false;

                runs(function() {
                    // when
                    elementInline
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
                    expect(elementInline.editor('readOnly')).toBe(false);
                    //trigger change
                    elementInline.editor('value', 'Blah blah', function() {
                        editorValueSet = true;
                    });
                });

                waitsFor(function() {
                    return editorValueSet;
                }, 'editor value to be set', 2000);

                runs(function() {
                    expect($(elementInline.editor('value')).text()).toBe('Blah blah');
                    //set readOnly mode
                    elementInline.editor('readOnly', true);
                    expect(elementInline.editor('readOnly')).toBe(true);
                    //set back to writeable mode and check
                    elementInline.editor('readOnly', false);
                    expect(elementInline.editor('readOnly')).toBe(false);

                    CKEDITOR.on('instanceDestroyed', function() {
                        instanceDestroyed = true;
                    });

                    elementInline.editor('destroy');
                });

                waitsFor(function() {
                    return instanceDestroyed;
                }, 'instance to be destroyed', 1000);
            });

        });

        describe('Function blur:', function () {
            it('for basic editor, removes focus from editor', function () {
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

            it('for inline editor, removes focus from editor', function () {
                var instanceReady = false;
                var instanceDestroyed = false;

                runs(function() {
                    // when
                    elementInline
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
                    elementInline.editor('focus');
                    //assert it is focused
                    expect(elementInline.editor('isFocused')).toBe(true);
                    //blur
                    elementInline.editor('blur');
                    //assert it is no longer focused
                    expect(elementInline.editor('isFocused')).toBe(false);

                    CKEDITOR.on('instanceDestroyed', function() {
                        instanceDestroyed = true;
                    });

                    elementInline.editor('destroy');
                });

                waitsFor(function() {
                    return instanceDestroyed;
                }, 'instance to be destroyed', 1000);
            });
        });
    });
});