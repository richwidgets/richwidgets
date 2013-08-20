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

      describe('move first to last:', function () {
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
          }, 'first item should be moved to end of list', 500);

          runs(function() {
            expect(widget._dumpState().orderedKeys).toEqual([2, 3, 4, 5, 6, 7, 8, 1]);
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