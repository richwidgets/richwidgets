define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/select/orderingList'], function () {

  describe('widget(orderingList): callback:', function () {

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

    describe('lifecycle events: ', function () {
      it('create:', function () {
        function test(fixture, element) {
          // given
          var createCallback = jasmine.createSpy('createCallback');
          var destroyCallback = jasmine.createSpy('destroyCallback');
          var addDomElementsCallback = jasmine.createSpy('addDomElementsCallback');

          // when
          element.orderingList({
            create: createCallback,
            destroy: destroyCallback,
            addDomElements: addDomElementsCallback
          });

          element.orderingList('destroy');

          //then
          expect(createCallback).toHaveBeenCalled();
          expect(addDomElementsCallback).toHaveBeenCalled();
          expect(destroyCallback).toHaveBeenCalled();
        }

        test(fixture_list, element_list);
        test(fixture_table, element_table);
      });
    });

    describe('interaction events: ', function () {
      it('create:', function () {
        function test(fixture, element) {
          // given
          var focusCallback = jasmine.createSpy('focusCallback');
          var changeCallback = jasmine.createSpy('changeCallback');
          var blurCallback = jasmine.createSpy('blurCallback');

          element.orderingList({
            focus: focusCallback,
            change: changeCallback,
            blur: blurCallback
          });

          // when
          var lastItem = fixture.find('.ui-selectee').last();

          runs(function () {
            lastItem.trigger('mousedown');
            lastItem.trigger('mouseup');
          });

          waitsFor(function () {
            return lastItem.hasClass('ui-selected');
          }, "item should be selected", 500);

          runs(function () {
            fixture.find('.button-column .btn-first').first().click();
          });

          waitsFor(function () {
            return fixture.find('.ui-selectee').first().data('key') === lastItem.data('key');
          }, 'first item should be moved to top of list', 500);

          runs(function () {
            fixture.find('#blur').focus();
          });

          waitsFor(function () {
            return fixture.find('#blur').get(0) === document.activeElement;
          }, 'blur button has focus', 500);

          runs(function () {
            expect(focusCallback).toHaveBeenCalled();
            expect(changeCallback).toHaveBeenCalled();
            expect(blurCallback).toHaveBeenCalled();
          });
        }

        test(fixture_list, element_list);
        test(fixture_table, element_table);
      });
    });

  });
});