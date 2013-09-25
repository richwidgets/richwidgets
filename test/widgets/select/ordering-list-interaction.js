define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/select/orderingList'], function () {

  describe('widget(orderingList): interaction:', function () {

    var fixture_list, element_list, original_list;
    var fixture_table, element_table, original_table;

    beforeEach(function () {
      var f = jasmine.getFixtures();
      f.load('test/widgets/select/ordering-list-source.html');

      var s = jasmine.getStyleFixtures();
      s.load('dist/assets/bootstrap/bootstrap.css');
      s.load('dist/assets/font-awesome/font-awesome.css');
      s.load('dist/assets/richfaces/select/select-list.css');
      s.load('dist/assets/richfaces/select/ordering-list.css');

      fixture_list = $('#fixture-ordering-list-list');
      original_list = fixture_list.clone();
      element_list = $('#list', fixture_list);
      fixture_table = $('#fixture-ordering-list-table');
      original_table = fixture_table.clone();
      element_table = $('#table', fixture_table);
    });

    describe('buttons: ', function () {
      it('move first to last:', function () {
        function test(fixture, element) {
          // given
          element.orderingList({});
          var widget = element.data('orderingList');
          expect(widget._dumpState().orderedKeys).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);

          // when
          var firstItem = fixture.find('.ui-selectee').first();

          //then
          runs(function () {
            firstItem.trigger('mousedown');
            firstItem.trigger('mouseup');
          });

          waitsFor(function () {
            return firstItem.hasClass('ui-selected');
          }, "first item should be selected", 500);

          runs(function () {
            expect(widget._createKeyArray(widget.getSelected()), [firstItem.data('key')]);
            fixture.find('.button-column .last').first().click();
          });

          waitsFor(function () {
            return fixture.find('.ui-selectee').last().data('key') === firstItem.data('key');
          }, 'item should be moved to end of list', 500);

          runs(function () {
            expect(widget._dumpState().orderedKeys).toEqual([2, 3, 4, 5, 6, 7, 8, 1]);
          });
        }

        test(fixture_list, element_list);
        test(fixture_table, element_table);
      });

      it('move last to first:', function () {
        function test(fixture, element) {
          // given
          element.orderingList({});
          var widget = element.data('orderingList');
          expect(widget._dumpState().orderedKeys).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);

          // when
          var lastItem = fixture.find('.ui-selectee').last();

          //then
          runs(function () {
            lastItem.trigger('mousedown');
            lastItem.trigger('mouseup');
          });

          waitsFor(function () {
            return lastItem.hasClass('ui-selected');
          }, "item should be selected", 500);

          runs(function () {
            fixture.find('.button-column .first').first().click();
          });

          waitsFor(function () {
            return fixture.find('.ui-selectee').first().data('key') === lastItem.data('key');
          }, 'first item should be moved to top of list', 500);

          runs(function () {
            expect(widget._dumpState().orderedKeys).toEqual([8, 1, 2, 3, 4, 5, 6, 7]);
          });
        }

        test(fixture_list, element_list);
        test(fixture_table, element_table);
      });

      it('move 2nd down to 3rd:', function () {
        function test(fixture, element) {
          // given
          element.orderingList({});
          var widget = element.data('orderingList');
          expect(widget._dumpState().orderedKeys).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);

          // when
          var item = $(fixture.find('.ui-selectee').get(1));

          //then
          runs(function () {
            item.trigger('mousedown');
            item.trigger('mouseup');
          });

          waitsFor(function () {
            return item.hasClass('ui-selected');
          }, "item should be selected", 500);

          runs(function () {
            fixture.find('.button-column .down').first().click();
          });

          waitsFor(function () {
            return $(fixture.find('.ui-selectee').get(2)).data('key') === item.data('key');
          }, 'first item should be moved down', 500);

          runs(function () {
            expect(widget._dumpState().orderedKeys).toEqual([1, 3, 2, 4, 5, 6, 7, 8]);
          });
        }

        test(fixture_list, element_list);
        test(fixture_table, element_table);
      });

      it('move 4th down to 3rd:', function () {
        function test(fixture, element) {
          // given
          element.orderingList({});
          var widget = element.data('orderingList');
          expect(widget._dumpState().orderedKeys).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);

          // when
          var item = $(fixture.find('.ui-selectee').get(3));

          //then
          runs(function () {
            item.trigger('mousedown');
            item.trigger('mouseup');
          });

          waitsFor(function () {
            return item.hasClass('ui-selected');
          }, "item should be selected", 500);

          runs(function () {
            fixture.find('.button-column .up').first().click();
          });

          waitsFor(function () {
            return $(fixture.find('.ui-selectee').get(2)).data('key') === item.data('key');
          }, 'first item should be moved up', 500);

          runs(function () {
            expect(widget._dumpState().orderedKeys).toEqual([1, 2, 4, 3 , 5, 6, 7, 8]);
          });
        }

        test(fixture_list, element_list);
        test(fixture_table, element_table);
      });

      it('dragSelect:', function () {
        function test(fixture, element) {
          // given
          element.orderingList({dragSelect: true});
          var widget = element.data('orderingList');
          expect(widget._dumpState().orderedKeys).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);

          // when
          var item = $(fixture.find('.ui-selectee').get(3));

          //then
          runs(function () {
            item.trigger('mousedown');
            item.simulate('drag', {dy: 40});
            item.trigger('mouseup');
          });

          waitsFor(function () {
            return $(fixture.find('.ui-selectee').get(5)).hasClass('ui-selected');
          }, 'fifth item should be selected', 500);

          runs(function () {
            expect(widget._createKeyArray(widget.getSelected())).toEqual([4, 5, 6]);
          });
        }
        test(fixture_list, element_list);
        test(fixture_table, element_table);
      });
    });

  });
});