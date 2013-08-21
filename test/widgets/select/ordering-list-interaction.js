define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/select/orderingList'], function () {

  var key = jQuery.simulate.keyCode;

  describe('widget(orderingList): interaction:', function () {

    beforeEach(function () {
      var f = jasmine.getFixtures();
      f.load('test/widgets/select/ordering-list-source.html');

      var s = jasmine.getStyleFixtures();
      s.load('dist/assets/bootstrap/bootstrap.css');
      s.load('dist/assets/font-awesome/font-awesome.css');
      s.load('dist/assets/richfaces/select/select-list.css');
      s.load('dist/assets/richfaces/select/ordering-list.css');
    });

    describe('list layout:', function () {

      var fixture, element, original;

      beforeEach(function () {
        fixture = $('#fixture-ordering-list-list');
        element = $('#list', fixture);
        original = fixture.clone();
      });

      describe('buttons: ', function () {
        it('move first to last:', function () {
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

          waitsFor(function() {
            return firstItem.hasClass('ui-selected');
          }, "first item should be selected", 500);

          runs(function () {
            fixture.find('.buttonColumn .last').first().click();
          });

          waitsFor(function() {
            return fixture.find('.ui-selectee').last().data('key') === firstItem.data('key');
          }, 'item should be moved to end of list', 500);

          runs(function() {
            expect(widget._dumpState().orderedKeys).toEqual([2, 3, 4, 5, 6, 7, 8, 1]);
          });
        });

        it('move last to first:', function () {
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

          waitsFor(function() {
            return lastItem.hasClass('ui-selected');
          }, "item should be selected", 500);

          runs(function () {
            fixture.find('.buttonColumn .first').first().click();
          });

          waitsFor(function() {
            return fixture.find('.ui-selectee').first().data('key') === lastItem.data('key');
          }, 'first item should be moved to top of list', 500);

          runs(function() {
            expect(widget._dumpState().orderedKeys).toEqual([8, 1, 2, 3, 4, 5, 6, 7]);
          });
        });

        it('move 2nd down to 3rd:', function () {
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

          waitsFor(function() {
            return item.hasClass('ui-selected');
          }, "item should be selected", 500);

          runs(function () {
            fixture.find('.buttonColumn .down').first().click();
          });

          waitsFor(function() {
            return $(fixture.find('.ui-selectee').get(2)).data('key') === item.data('key');
          }, 'first item should be moved down', 500);

          runs(function() {
            expect(widget._dumpState().orderedKeys).toEqual([1, 3, 2, 4, 5, 6, 7, 8]);
          });
        });

        it('move 4th down to 3rd:', function () {
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

          waitsFor(function() {
            return item.hasClass('ui-selected');
          }, "item should be selected", 500);

          runs(function () {
            fixture.find('.buttonColumn .up').first().click();
          });

          waitsFor(function() {
            return $(fixture.find('.ui-selectee').get(2)).data('key') === item.data('key');
          }, 'first item should be moved up', 500);

          runs(function() {
            expect(widget._dumpState().orderedKeys).toEqual([1, 2, 4, 3 , 5, 6, 7, 8]);
          });
        });
      });

    });

    describe('table layout:', function () {

      var fixture, element, original;

      beforeEach(function () {
        fixture = $('#fixture-ordering-list-table');
        original = fixture.clone();
        element = $('#table', fixture);
      });

      afterEach(function () {
        // when
        element.orderingList('destroy');
        // then
        expect(fixture).toHaveEqualDom(original);
      });

    });
  });
});