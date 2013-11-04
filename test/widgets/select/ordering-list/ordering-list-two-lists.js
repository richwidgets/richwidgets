define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/select/orderingList'], function () {

  describe('widget(orderingList): two lists interactions:', function () {

    var fixture_lists, element_list1, element_list2;
    var fixture_tables, element_table1, element_table2;

    beforeEach(function () {
      var f = jasmine.getFixtures();
      f.load('test/widgets/select/ordering-list/ordering-list-two-lists.html');

      var s = jasmine.getStyleFixtures();
      s.appendLoad('dist/assets/bootstrap/bootstrap.css');
      s.appendLoad('dist/assets/font-awesome/font-awesome.css');
      s.appendLoad('dist/assets/richwidgets/select/select-list.css');
      s.appendLoad('dist/assets/richwidgets/select/ordering-list.css');

      fixture_lists = $('#fixture-ordering-list-lists');
      element_list1 = $('#list1', fixture_lists);
      element_list2 = $('#list2', fixture_lists);
      fixture_tables = $('#fixture-ordering-list-tables');
      element_table1 = $('#table1', fixture_tables);
      element_table2 = $('#table2', fixture_tables);
    });

    function connectLists(list1, list2) {
      list1.orderingList('connectWith', list2);
      list2.orderingList('connectWith', list1);
    }

    describe('moving items between two connected lists:', function () {

      describe('dropOnEmpty option:', function () {

        function test(list1, list2, dropOnEmpty) {
          // given
          list1.orderingList({contained: false, dropOnEmpty: dropOnEmpty});
          list2.orderingList({contained: false});
          connectLists(list1, list2);

          var widget1 = list1.data('orderingList');
          expect(widget1._dumpState().orderedKeys).toEqual([1, 2, 3, 4]);
          var widget2 = list2.data('orderingList');
          expect(widget2._dumpState().orderedKeys).toEqual(['a']);

          // when
          var itemA = list2.find('.ui-selectee:contains(\'Item a\')');
          runs(function () {
            itemA.trigger('mousedown');
            itemA.simulate('drag', {dy: -80});
            itemA.trigger('mouseup');
          });

          waitsFor(function () {
            return widget1._dumpState().orderedKeys.length === 5;
          }, 'item to move to list1', 500);

          // then
          runs(function () {
            var state = widget1._dumpState().orderedKeys;
            expect(state).toContain('a');
            expect(state).toContain(1);
            expect(state).toContain(2);
            expect(state).toContain(3);
            expect(state).toContain(4);
            expect(widget2._dumpState().orderedKeys).toEqual([]);
          });

          // try to drop to empty list
          // when
          runs(function () {
            itemA = list1.find('.ui-selectee:contains(\'Item a\')');
            itemA.trigger('mousedown');
            itemA.simulate('drag', {dy: 120});
            itemA.trigger('mouseup');
          });

          waitsFor(function () {
            return widget1._dumpState().orderedKeys.length === (dropOnEmpty === true ? 4 : 5);
          }, 'item to move to list2', 500);

          // then
          runs(function () {
            if (dropOnEmpty === true) {
              expect(widget1._dumpState().orderedKeys).toEqual([1, 2, 3, 4]);
              expect(widget2._dumpState().orderedKeys).toEqual(['a']);
            }
            else {
              expect(widget1._dumpState().orderedKeys).toEqual([1, 2, 3, 4, 'a']);
              expect(widget2._dumpState().orderedKeys).toEqual([]);
            }
          });
        }

        it('when dropOnEmpty is true, then item can be dropped on empty list:', function () {
          test(element_list1, element_list2, true);
          test(element_table1, element_table2, true);
        });

        it('when dropOnEmpty is false, then item can not be dropped on empty list:', function () {
          test(element_list1, element_list2, false);
          test(element_table1, element_table2, false);
        });
      });

      describe('contained option:', function () {

        function test(list1, list2, contained) {
          // given
          list1.orderingList({});
          list2.orderingList({contained: contained});
          connectLists(list1, list2);

          var widget1 = list1.data('orderingList');
          expect(widget1._dumpState().orderedKeys).toEqual([1, 2, 3, 4]);
          var widget2 = list2.data('orderingList');
          expect(widget2._dumpState().orderedKeys).toEqual(['a']);

          // when
          var itemA = list2.find('.ui-selectee:contains(\'Item a\')');
          runs(function () {
            itemA.trigger('mousedown');
            itemA.simulate('drag', {dy: -80});
            itemA.trigger('mouseup');
          });

          waitsFor(function () {
            return (contained === true ? itemA.hasClass('ui-selected') : widget1._dumpState().orderedKeys.length === 5);
          }, 'item to be selected', 500);

          // then
          runs(function () {
            if (contained === false) {
              var state = widget1._dumpState().orderedKeys;
              expect(state).toContain('a');
              expect(state).toContain(1);
              expect(state).toContain(2);
              expect(state).toContain(3);
              expect(state).toContain(4);
              expect(widget2._dumpState().orderedKeys).toEqual([]);
            } else {
              expect(widget1._dumpState().orderedKeys).toEqual([1, 2, 3, 4]);
              expect(widget2._dumpState().orderedKeys).toEqual(['a']);
            }
          });
        }

        it('when contained is true, then item can not be moved out of the list:', function () {
          test(element_list1, element_list2, true);
          test(element_table1, element_table2, true);
        });

        it('when contained is false, then item can be moved out of the list:', function () {
          test(element_list1, element_list2, false);
          test(element_table1, element_table2, false);
        });
      });
    });

  });

});