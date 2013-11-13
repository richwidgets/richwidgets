define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/select/ordering-list', 'src/widgets/select/pick-list'], function () {

  describe('widget(pickList): interaction:', function () {

    var fixture_list, element_list, original_list;
    var fixture_table, element_table, original_table;

    beforeEach(function () {
      var f = jasmine.getFixtures();
      f.load('test/widgets/select/pick-list/pick-list-source.html');

      var s = jasmine.getStyleFixtures();
      s.appendLoad('dist/assets/bootstrap/bootstrap.css');
      s.appendLoad('dist/assets/font-awesome/font-awesome.css');
      s.appendLoad('dist/assets/richwidgets/select/select-list.css');
      s.appendLoad('dist/assets/richwidgets/select/ordering-list.css');
      s.appendLoad('dist/assets/richwidgets/select/pick-list.css');

      fixture_list = $('#fixture-pick-list-list');
      original_list = fixture_list.clone();
      element_list = $('#list', fixture_list);
      fixture_table = $('#fixture-pick-list-table');
      original_table = fixture_table.clone();
      element_table = $('#table', fixture_table);
    });

    describe('buttons: ', function () {
      it('move source to target:', function () {
        function test(fixture, element) {
          // given
          element.pickList();
          var widget = element.data('pickList');
          expect(widget._uiHash().pickedKeys).toEqual([9, 10, 11]);

          // when
          var firstItem = fixture.find('.source .ui-selectee').first();

          //then
          runs(function () {
            firstItem.trigger('mousedown');
            firstItem.trigger('mouseup');
          });

          waitsFor(function () {
            return firstItem.hasClass('ui-selected');
          }, 'first item should be selected', 500);

          runs(function () {
            fixture.find('.pick-button-column .btn-add').first().click();
          });

          waitsFor(function () {
            return fixture.find('.target .ui-selectee').first().data('key') === firstItem.data('key');
          }, 'item should be moved to top of target list', 500);

          runs(function () {
            expect(widget._uiHash().pickedKeys).toEqual([1, 9, 10, 11]);
          });
        }

        test(fixture_list, element_list);
        test(fixture_table, element_table);
      });

      it('switchByClick:', function () {
        function test(fixture, element) {
          // given
          element.pickList({});

          element.pickList('option', 'switchByClick', true);

          var widget = element.data('pickList');
          expect(widget._uiHash().pickedKeys).toEqual([9, 10, 11]);

          // when
          var item = $(fixture.find('.source .ui-selectee').get(3));

          expect(item.data('key')).toEqual(4);

          //then
          runs(function () {
            item.trigger('click');
          });

          waitsFor(function () {
            return fixture.find('.target .ui-selectee').first().data('key') === item.data('key');
          }, 'item should be moved to the target', 500);

          runs(function () {
            expect(widget._uiHash().pickedKeys).toEqual([4, 9, 10, 11]);
          });
        }
        test(fixture_list, element_list);
        test(fixture_table, element_table);
      });

      it('switchByDblClick:', function () {
        function test(fixture, element) {
          // given
          element.pickList({});

          element.pickList('option', 'switchByDblClick', true);

          var widget = element.data('pickList');
          expect(widget._uiHash().pickedKeys).toEqual([9, 10, 11]);

          // when
          var item = $(fixture.find('.source .ui-selectee').get(3));

          expect(item.data('key')).toEqual(4);

          //then
          runs(function () {
            item.trigger('dblclick');
          });

          waitsFor(function () {
            return fixture.find('.target .ui-selectee').first().data('key') === item.data('key');
          }, 'item should be moved to the target', 500);

          runs(function () {
            expect(widget._uiHash().pickedKeys).toEqual([4, 9, 10, 11]);
          });
        }
        test(fixture_list, element_list);
        test(fixture_table, element_table);
      });
    });

  });
});