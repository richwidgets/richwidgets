define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/select/ordering-list'], function () {

  describe('widget(orderingList): public functions:', function () {

    var fixture_list, element_list, original_list;
    var fixture_table, element_table, original_table;

    beforeEach(function () {
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

    // function connectWith is tested in ordering-list-two-lists.js
    // function destroy is called after each test method in ordering-list-options.js

    describe('add:', function () {
      it('one item addition:', function () {
        test(element_list);
        test(element_table);

        function test(list) {
          list.orderingList({});
//          TODO: enable after #101
//          var expectedSizeAfter = list.find('.ui-selectee').length + 1;

          runs(function () {
            list.orderingList('add', '<li>Item 9</li>');
          });

//          TODO: enable after #101 and remove the next wait
//          waitsFor(function () {
//            return list.find('.ui-selectee').length === expectedSizeAfter;
//          }, 500, 'item to be added');
          waitsFor(function () {
            return list.find('li:contains(\'Item 9\')').is(':visible');
          }, 500, 'item to be added');
        }
      });
    });
    
    describe('getOrderedElements:', function () {
      it('from initial state of list:', function () {
        test(element_list);
        test(element_table);

        function test(list) {
          list.orderingList({});
          var elements = list.orderingList('getOrderedElements');
          expect(elements.length).toEqual(8);
          for (var i = 0; i < elements.length; i++) {
            expect($(elements[i]).is(':contains(Item ' + (i + 1) + ')')).toBe(true);
          }
        }
      });

      it('after first item moved to last position:', function () {
        test(fixture_list, element_list);
        test(fixture_table, element_table);

        function test(fixture, list) {
          list.orderingList({});
          var item = list.find('.ui-selectee:contains(\'Item 1\')');

          runs(function () {
            item.trigger('mousedown').trigger('mouseup');
          });

          waitsFor(function () {
            return item.hasClass('ui-selected');
          }, 500, 'item to be selected');

          runs(function () {
            fixture.find('.btn-last').click();
          });
          waitsFor(function () {
            return item.index() === 7;
          }, 500, 'item to be moved');

          runs(function () {
            var elements = list.orderingList('getOrderedElements');
            expect(elements.length).toEqual(8);
            for (var i = 0; i < elements.length - 1; i++) { // all items should be shifted by 1 place
              expect($(elements[i]).is(':contains(Item ' + (i + 2) + ')')).toBe(true);
            }
            // last item (the moved element) should contain 'Item 1' 
            expect($(elements).last().is(':contains(Item 1)')).toBe(true);
          });
        }
      });
    });

    describe('getSelected:', function () {
      it('from initial state of list:', function () {
        test(element_list);
        test(element_table);

        function test(list) {
          list.orderingList({});
          var elements = list.orderingList('getSelected');
          expect(elements.length).toEqual(0);
        }
      });

      it('after selecting few items:', function () {
        test(element_list);
        test(element_table);

        function test(list) {
          list.orderingList({});
          var item1 = list.find('.ui-selectee:contains(\'Item 1\')');
          var item3 = list.find('.ui-selectee:contains(\'Item 3\')');
          var item5 = list.find('.ui-selectee:contains(\'Item 5\')');

          var items = [item1, item3, item5];

          runs(function () {
            selectMultipleItems(items);
          });

          waitsFor(function () {
            return item1.hasClass('ui-selected') && item3.hasClass('ui-selected') && item5.hasClass('ui-selected');
          }, 500, 'items to be selected');


          runs(function () {
            var selected = list.orderingList('getSelected');
            expect(selected.length).toEqual(3);
            for (var i = 0; i < selected.length; i++) {
              expect($(selected[i]).index()).toEqual($(items[i]).index());
            }
          });
        }
      });
    });

    describe('isSelected:', function () {
      it('when one item is selected:', function () {
        test(element_list);
        test(element_table);

        function test(list) {
          list.orderingList({});

          var item = list.find('.ui-selectee:contains(\'Item 1\')');

          expect(list.orderingList('isSelected', item)).toEqual(false);

          runs(function () {
            item.trigger('mousedown').trigger('mouseup');
          });

          waitsFor(function () {
            return item.hasClass('ui-selected');
          }, 500, 'item to be selected');
        }
      });
    });

    describe('move functions:', function () {
      describe('moveTop:', function () {
        it('move single item to top:', function () {
          testItemMovement(element_list, 5, 'moveTop');
          testItemMovement(element_table, 5, 'moveTop');
        });
      });

      describe('moveLast:', function () {
        it('move single item to bottom:', function () {
          testItemMovement(element_list, 2, 'moveLast');
          testItemMovement(element_table, 2, 'moveLast');
        });
      });

      describe('moveUp:', function () {
        it('move single item up:', function () {
          testItemMovement(element_list, 1, 'moveUp');
          testItemMovement(element_table, 1, 'moveUp');
        });
      });

      describe('moveDown:', function () {
        it('move single item down:', function () {
          testItemMovement(element_list, 6, 'moveDown');
          testItemMovement(element_table, 6, 'moveDown');
        });
      });

      function testItemMovement (list, index, functionName) {
        list.orderingList({});
        var item = list.find('.ui-selectee:eq(' + index + ')');
        var expectedIndexAfter = getExpectedIndex(item.index(), functionName);

        runs(function () {
          list.orderingList(functionName, item);
        });

        waitsFor(function () {
          return item.index() === expectedIndexAfter;
        }, 500, 'item to be moved (' + functionName + ')');

        function thresholdValue (value) {
          if (value < 0) {
            return 0;
          }
          if (value > 7) {
            return 7;
          }
          return value;
        }

        function getExpectedIndex (indexBefore, functionName) {
          switch (functionName) {
            case 'moveUp':
              return thresholdValue(indexBefore - 1);
            case 'moveDown':
              return thresholdValue(indexBefore + 1);
            case 'moveTop':
              return 0;
            case 'moveLast':
              return 7;
            default:
              throw 'unknown function name [' + functionName + ']';
          }
        }
      }
    });

    describe('remove:', function () {
      it('remove first item:', function () {
        test(element_list, '.ui-selectee:first');
        test(element_table, '.ui-selectee:first');
      });

      it('remove items with index greater than 3:', function () {
        test(element_list, '.ui-selectee:gt(3)');
        test(element_table, '.ui-selectee:gt(3)');
      });

      function test(list, itemSelector) {
        list.orderingList({});
        var toBeDeleted = list.find(itemSelector);
        var expectedItemsSize = list.find('.ui-selectee').length - toBeDeleted.length;
        expect(expectedItemsSize).toBeGreaterThan(0);

        runs(function () {
          list.orderingList('remove', toBeDeleted);
        });

        waitsFor(function () {
          return !list.find('.ui-selectee:eq(7)').is(':visible');
        }, 500, 'item to be removed');

        runs(function () {
          expect(list.find('.ui-selectee').length).toEqual(expectedItemsSize);
        });
      }
    });

    describe('selectItem:', function () {
      it('select one item:', function () {
        test(element_list, '.ui-selectee:first');
        test(element_table, '.ui-selectee:first');
      });
      it('select multiple items with index greater than 3:', function () {
        test(element_list, '.ui-selectee:gt(3)');
        test(element_table, '.ui-selectee:gt(3)');
      });

      function test(list, itemSelector) {
        list.orderingList({});
        var toBeSelected = list.find(itemSelector);
        var expectedSelectedItemsSize = toBeSelected.length;
        expect(expectedSelectedItemsSize).toBeGreaterThan(0);

        runs(function () {
          list.orderingList('selectItem', toBeSelected);
        });

        waitsFor(function () {
          return toBeSelected.last().hasClass('ui-selected');
        }, 500, 'item to be selected');

        runs(function () {
          expect(list.find('.ui-selected').length).toEqual(expectedSelectedItemsSize);
        });
      }
    });

    describe('unSelectItem:', function () {
      it('select one item and unselect it:', function () {
        test(element_list);
        test(element_table);

        function test(list) {
          list.orderingList({});

          var item = list.find('.ui-selectee:contains(\'Item 1\')');

          runs(function () {
            item.trigger('mousedown').trigger('mouseup');
          });

          waitsFor(function () {
            return item.hasClass('ui-selected');
          }, 500, 'item to be selected');

          runs(function () {
            list.orderingList('unSelectItem', item);
          });

          waitsFor(function () {
            return !item.hasClass('ui-selected');
          }, 500, 'item to be unselected');
        }
      });
    });

    describe('unSelectAll:', function () {
      it('select few items and unselect all', function () {
        test(element_list);
        test(element_table);

        function test(list) {
          list.orderingList({});

          var item1 = list.find('.ui-selectee:contains(\'Item 1\')');
          var item3 = list.find('.ui-selectee:contains(\'Item 3\')');
          var item5 = list.find('.ui-selectee:contains(\'Item 5\')');

          runs(function () {
            selectMultipleItems([item1, item3, item5]);
          });

          waitsFor(function () {
            return item1.hasClass('ui-selected') && item3.hasClass('ui-selected') && item5.hasClass('ui-selected');
          }, 500, 'items to be selected');

          runs(function () {
            list.orderingList('unSelectAll');
          });

          waitsFor(function () {
            return !item1.hasClass('ui-selected') && !item3.hasClass('ui-selected') && !item5.hasClass('ui-selected');
          }, 500, 'items to be unselected');
        }
      });
    });

    function selectMultipleItems (itemsArray) {
      for (var i = 0; i < itemsArray.length; i++) {
        // events needs to be here
        var ctrlClickDown = jQuery.Event('mousedown');
        ctrlClickDown.ctrlKey = true;
        var ctrlClickUp = jQuery.Event('mouseup');
        ctrlClickUp.ctrlKey = true;

        itemsArray[i].trigger(ctrlClickDown).trigger(ctrlClickUp);
      }
    }
  });
});