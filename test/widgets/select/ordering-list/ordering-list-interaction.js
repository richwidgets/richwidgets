define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/select/orderingList'], function() {

    describe('widget(orderingList): interaction:', function() {

        var fixture_list, element_list, original_list;
        var fixture_table, element_table, original_table;
        beforeEach(function() {
            var f = jasmine.getFixtures();
            f.load('test/widgets/select/ordering-list/ordering-list-source.html');

            var s = jasmine.getStyleFixtures();
            s.appendLoad('dist/assets/bootstrap/bootstrap.css');
            s.appendLoad('dist/assets/font-awesome/font-awesome.css');
            s.appendLoad('dist/assets/richwidgets/select/select-list.css');
            s.appendLoad('dist/assets/richwidgets/select/ordering-list.css');

            fixture_list = $('#fixture-ordering-list-list');
            original_list = fixture_list.clone();
            element_list = $('#list', fixture_list);
            fixture_table = $('#fixture-ordering-list-table');
            original_table = fixture_table.clone();
            element_table = $('#table', fixture_table);
        });

        describe('moving items by buttons: ', function() {

            it('move first to last:', function() {
                function test(fixture, element) {
                    // given
                    element.orderingList({});
                    var widget = element.data('orderingList');
                    expect(widget._dumpState().orderedKeys).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
                    // when
                    var firstItem = fixture.find('.ui-selectee').first();
                    //then
                    runs(function() {
                        firstItem.trigger('mousedown');
                        firstItem.trigger('mouseup');
                    });
                    waitsFor(function() {
                        return firstItem.hasClass('ui-selected');
                    }, "first item should be selected", 500);
                    runs(function() {
                        expect(widget._createKeyArray(widget.getSelected()), [firstItem.data('key')]);
                        fixture.find('.button-column .btn-last').first().click();
                    });
                    waitsFor(function() {
                        return fixture.find('.ui-selectee').last().data('key') === firstItem.data('key');
                    }, 'item should be moved to end of list', 500);
                    runs(function() {
                        expect(widget._dumpState().orderedKeys).toEqual([2, 3, 4, 5, 6, 7, 8, 1]);
                    });
                }

                test(fixture_list, element_list);
                test(fixture_table, element_table);
            });

            it('move multiple elements to bottom:', function() {
                function test(fixture, element) {
                    // given
                    element.orderingList({});
                    var widget = element.data('orderingList');
                    expect(widget._dumpState().orderedKeys).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
                    // when
                    var item1 = fixture.find('.ui-selectee:contains(1)');
                    var item4 = fixture.find('.ui-selectee:contains(4)');
                    var item7 = fixture.find('.ui-selectee:contains(7)');
                    var items = [item1, item4, item7];
                    //then
                    runs(function() {
                        selectMultipleItems(items);
                    });
                    waitsFor(function() {
                        return item1.hasClass('ui-selected')
                                && item4.hasClass('ui-selected')
                                && item7.hasClass('ui-selected');
                    }, "items should be selected", 1000);
                    runs(function() {
                        expect(widget._createKeyArray(widget.getSelected()), items);
                        fixture.find('.button-column .btn-last').click();
                    });
                    waitsFor(function() {
                        return fixture.find('.ui-selectee:eq(5)').data('key') === item1.data('key')
                                && fixture.find('.ui-selectee:eq(6)').data('key') === item4.data('key')
                                && fixture.find('.ui-selectee:eq(7)').data('key') === item7.data('key');
                    }, 'items should be moved to end of list', 1000);
                    runs(function() {
                        expect(widget._dumpState().orderedKeys).toEqual([2, 3, 5, 6, 8, 1, 4, 7]);
                    });
                }

                test(fixture_list, element_list);
                test(fixture_table, element_table);
            });

            it('move last to first:', function() {
                function test(fixture, element) {
                    // given
                    element.orderingList({});
                    var widget = element.data('orderingList');
                    expect(widget._dumpState().orderedKeys).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
                    // when
                    var lastItem = fixture.find('.ui-selectee').last();
                    //then
                    runs(function() {
                        lastItem.trigger('mousedown');
                        lastItem.trigger('mouseup');
                    });
                    waitsFor(function() {
                        return lastItem.hasClass('ui-selected');
                    }, "item should be selected", 500);
                    runs(function() {
                        fixture.find('.button-column .btn-first').first().click();
                    });
                    waitsFor(function() {
                        return fixture.find('.ui-selectee').first().data('key') === lastItem.data('key');
                    }, 'first item should be moved to top of list', 500);
                    runs(function() {
                        expect(widget._dumpState().orderedKeys).toEqual([8, 1, 2, 3, 4, 5, 6, 7]);
                    });
                }

                test(fixture_list, element_list);
                test(fixture_table, element_table);
            });

            it('move multiple elements to top:', function() {
                function test(fixture, element) {
                    // given
                    element.orderingList({});
                    var widget = element.data('orderingList');
                    expect(widget._dumpState().orderedKeys).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
                    // when
                    var item1 = fixture.find('.ui-selectee:contains(1)');
                    var item4 = fixture.find('.ui-selectee:contains(4)');
                    var item7 = fixture.find('.ui-selectee:contains(7)');
                    var items = [item1, item4, item7];
                    //then
                    runs(function() {
                        selectMultipleItems(items);
                    });
                    waitsFor(function() {
                        return item1.hasClass('ui-selected')
                                && item4.hasClass('ui-selected')
                                && item7.hasClass('ui-selected');
                    }, "items should be selected", 1000);
                    runs(function() {
                        expect(widget._createKeyArray(widget.getSelected()), items);
                        fixture.find('.button-column .btn-first').click();
                    });
                    waitsFor(function() {
                        return fixture.find('.ui-selectee:eq(0)').data('key') === item1.data('key')
                                && fixture.find('.ui-selectee:eq(1)').data('key') === item4.data('key')
                                && fixture.find('.ui-selectee:eq(2)').data('key') === item7.data('key');
                    }, 'items should be moved to top of list', 1000);
                    runs(function() {
                        expect(widget._dumpState().orderedKeys).toEqual([1, 4, 7, 2, 3, 5, 6, 8]);
                    });
                }

                test(fixture_list, element_list);
                test(fixture_table, element_table);
            });

            it('move 2nd down to 3rd:', function() {
                function test(fixture, element) {
                    // given
                    element.orderingList({});
                    var widget = element.data('orderingList');
                    expect(widget._dumpState().orderedKeys).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
                    // when
                    var item = $(fixture.find('.ui-selectee').get(1));
                    //then
                    runs(function() {
                        item.trigger('mousedown');
                        item.trigger('mouseup');
                    });
                    waitsFor(function() {
                        return item.hasClass('ui-selected');
                    }, "item should be selected", 500);
                    runs(function() {
                        fixture.find('.button-column .btn-down').first().click();
                    });
                    waitsFor(function() {
                        return $(fixture.find('.ui-selectee').get(2)).data('key') === item.data('key');
                    }, 'first item should be moved down', 500);
                    runs(function() {
                        expect(widget._dumpState().orderedKeys).toEqual([1, 3, 2, 4, 5, 6, 7, 8]);
                    });
                }

                test(fixture_list, element_list);
                test(fixture_table, element_table);
            });


            it('move multiple elements twice down:', function() {
                function test(fixture, element) {
                    // given
                    element.orderingList({});
                    var widget = element.data('orderingList');
                    expect(widget._dumpState().orderedKeys).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
                    // when
                    var item1 = fixture.find('.ui-selectee:contains(1)');
                    var item4 = fixture.find('.ui-selectee:contains(4)');
                    var item7 = fixture.find('.ui-selectee:contains(7)');
                    var items = [item1, item4, item7];
                    //then
                    runs(function() {
                        selectMultipleItems(items);
                    });
                    waitsFor(function() {
                        return item1.hasClass('ui-selected')
                                && item4.hasClass('ui-selected')
                                && item7.hasClass('ui-selected');
                    }, "items should be selected", 1000);
                    runs(function() {
                        expect(widget._createKeyArray(widget.getSelected()), items);
                        fixture.find('.button-column .btn-down').click();
                    });
                    waitsFor(function() {
                        return fixture.find('.ui-selectee:eq(1)').data('key') === item1.data('key')
                                && fixture.find('.ui-selectee:eq(4)').data('key') === item4.data('key')
                                && fixture.find('.ui-selectee:eq(7)').data('key') === item7.data('key');
                    }, 'items should be moved down in the list', 1000);
                    runs(function() {
                        expect(widget._dumpState().orderedKeys).toEqual([2, 1, 3, 5, 4, 6, 8, 7]);
                    });
                    // second time
                    runs(function() {
                        expect(widget._createKeyArray(widget.getSelected()), items);
                        fixture.find('.button-column .btn-down').click();
                    });
                    waitsFor(function() {
                        return fixture.find('.ui-selectee:eq(2)').data('key') === item1.data('key')
                                && fixture.find('.ui-selectee:eq(5)').data('key') === item4.data('key')
                                && fixture.find('.ui-selectee:eq(7)').data('key') === item7.data('key');
                    }, 'items should be moved down in the list', 1000);
                    runs(function() {
                        expect(widget._dumpState().orderedKeys).toEqual([2, 3, 1, 5, 6, 4, 8, 7]);
                    });
                }

                test(fixture_list, element_list);
                test(fixture_table, element_table);
            });

            it('move 4th up to 3rd:', function() {
                function test(fixture, element) {
                    // given
                    element.orderingList({});
                    var widget = element.data('orderingList');
                    expect(widget._dumpState().orderedKeys).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
                    // when
                    var item = $(fixture.find('.ui-selectee').get(3));
                    //then
                    runs(function() {
                        item.trigger('mousedown');
                        item.trigger('mouseup');
                    });
                    waitsFor(function() {
                        return item.hasClass('ui-selected');
                    }, "item should be selected", 500);
                    runs(function() {
                        fixture.find('.button-column .btn-up').first().click();
                    });
                    waitsFor(function() {
                        return $(fixture.find('.ui-selectee').get(2)).data('key') === item.data('key');
                    }, 'item should be moved up', 500);
                    runs(function() {
                        expect(widget._dumpState().orderedKeys).toEqual([1, 2, 4, 3, 5, 6, 7, 8]);
                    });
                }

                test(fixture_list, element_list);
                test(fixture_table, element_table);
            });

            it('move multiple elements twice up:', function() {
                function test(fixture, element) {
                    // given
                    element.orderingList({});
                    var widget = element.data('orderingList');
                    expect(widget._dumpState().orderedKeys).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
                    // when
                    var item1 = fixture.find('.ui-selectee:contains(1)');
                    var item4 = fixture.find('.ui-selectee:contains(4)');
                    var item7 = fixture.find('.ui-selectee:contains(7)');
                    var items = [item1, item4, item7];
                    //then
                    runs(function() {
                        selectMultipleItems(items);
                    });
                    waitsFor(function() {
                        return item1.hasClass('ui-selected')
                                && item4.hasClass('ui-selected')
                                && item7.hasClass('ui-selected');
                    }, "items should be selected", 1000);
                    runs(function() {
                        expect(widget._createKeyArray(widget.getSelected()), items);
                        fixture.find('.button-column .btn-up').click();
                    });
                    waitsFor(function() {
                        return fixture.find('.ui-selectee:eq(0)').data('key') === item1.data('key')
                                && fixture.find('.ui-selectee:eq(2)').data('key') === item4.data('key')
                                && fixture.find('.ui-selectee:eq(5)').data('key') === item7.data('key');
                    }, 'items should be moved up in the list', 1000);
                    runs(function() {
                        expect(widget._dumpState().orderedKeys).toEqual([1, 2, 4, 3, 5, 7, 6, 8]);
                    });
                    // second time
                    runs(function() {
                        expect(widget._createKeyArray(widget.getSelected()), items);
                        fixture.find('.button-column .btn-up').click();
                    });
                    waitsFor(function() {
                        return fixture.find('.ui-selectee:eq(0)').data('key') === item1.data('key')
                                && fixture.find('.ui-selectee:eq(1)').data('key') === item4.data('key')
                                && fixture.find('.ui-selectee:eq(4)').data('key') === item7.data('key');
                    }, 'items should be moved up in the list', 1000);
                    runs(function() {
                        expect(widget._dumpState().orderedKeys).toEqual([1, 4, 2, 3, 7, 5, 6, 8]);
                    });
                }

                test(fixture_list, element_list);
                test(fixture_table, element_table);
            });

            it('dragSelect:', function() {
                function test(fixture, element) {
                    // given
                    element.orderingList({dragSelect: true});
                    var widget = element.data('orderingList');
                    expect(widget._dumpState().orderedKeys).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
                    // when
                    var item = $(fixture.find('.ui-selectee').get(3));
                    //then
                    runs(function() {
                        item.trigger('mousedown');
                        item.simulate('drag', {dy: 80});
                        item.trigger('mouseup');
                    });
                    waitsFor(function() {
                        return $(fixture.find('.ui-selectee').get(5)).hasClass('ui-selected');
                    }, 'fifth item should be selected', 500);
                    runs(function() {
                        expect(widget._createKeyArray(widget.getSelected())).toEqual([4, 5, 6]);
                    });
                }

                test(fixture_list, element_list);
                test(fixture_table, element_table);
            });
        });

        describe("moving items by drag:", function() {

            it('moving single item to top by dragging:', function() {
                function test(fixture, element) {
                    // given
                    element.orderingList({});
                    var widget = element.data('orderingList');
                    expect(widget._dumpState().orderedKeys).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
                    // when
                    var item = fixture.find('.ui-selectee:contains(8)');
                    //then
                    runs(function() {
                        item.trigger('mousedown');
                        item.simulate('drag', {dy: -500});
                        item.trigger('mouseup');
                    });
                    runs(function() {
                        expect(widget._dumpState().orderedKeys).toEqual([8, 1, 2, 3, 4, 5, 6, 7]);
                    });
                }

                test(fixture_list, element_list);
                test(fixture_table, element_table);
            });

            it('moving multiple items to top by dragging:', function() {
                function test(fixture, element) {
                    // given
                    element.orderingList({});
                    var widget = element.data('orderingList');
                    expect(widget._dumpState().orderedKeys).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
                    // when
                    var item1 = fixture.find('.ui-selectee:contains(1)');
                    var item4 = fixture.find('.ui-selectee:contains(4)');
                    var item7 = fixture.find('.ui-selectee:contains(7)');
                    //then
                    runs(function() {
                        selectMultipleItemsAndDragBy([item1, item4, item7], -10);
                    });
                    runs(function() {
                        expect(widget._dumpState().orderedKeys).toEqual([1, 4, 7, 2, 3, 5, 6, 8]);
                    });


                    function selectMultipleItemsAndDragBy(itemsArray, by) {
                        for (var i = 0; i < itemsArray.length; i++) {
                            multipleSelect(itemsArray[i]);
                        }
                        item = itemsArray[0];
                        item.simulate('drag', {dy: by});
                    }

                    function multipleSelect(item) {
                        // events needs to be here
                        var ctrlClickDown = jQuery.Event('mousedown');
                        ctrlClickDown.ctrlKey = true;
                        var ctrlClickUp = jQuery.Event('mouseup');
                        ctrlClickUp.ctrlKey = true;
                        item.trigger(ctrlClickDown);
                        item.trigger(ctrlClickUp);
                    }
                }

                test(fixture_list, element_list);
                test(fixture_table, element_table);
            });
        });

        function selectMultipleItems(itemsArray) {
            for (var i = 0; i < itemsArray.length; i++) {
                // events needs to be here
                var ctrlClickDown = jQuery.Event('mousedown');
                ctrlClickDown.ctrlKey = true;
                var ctrlClickUp = jQuery.Event('mouseup');
                ctrlClickUp.ctrlKey = true;

                itemsArray[i].trigger(ctrlClickDown);
                itemsArray[i].trigger(ctrlClickUp);
            }
        }
    });
});