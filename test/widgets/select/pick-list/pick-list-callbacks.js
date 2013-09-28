define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/select/pickList'], function () {

  describe('widget(pickList): callback:', function () {

    var fixture_list, element_list, original_list;
    var fixture_table, element_table, original_table;

    beforeEach(function () {
      var f = jasmine.getFixtures();
      f.load('test/widgets/select/pick-list/pick-list-source.html');

      var s = jasmine.getStyleFixtures();
      s.load('dist/assets/bootstrap/bootstrap.css');
      s.load('dist/assets/font-awesome/font-awesome.css');
      s.load('dist/assets/richfaces/select/select-list.css');
      s.load('dist/assets/richfaces/select/ordering-list.css');
      s.load('dist/assets/richfaces/select/pick-list.css');

      fixture_list = $('#fixture-pick-list-list');
      original_list = fixture_list.clone();
      element_list = $('#list', fixture_list);
      fixture_table = $('#fixture-pick-list-table');
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
          element.pickList({
            create: createCallback,
            destroy: destroyCallback,
            addDomElements: addDomElementsCallback
          });

          element.pickList('destroy');

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

          element.pickList({
            focus: focusCallback,
            change: changeCallback,
            blur: blurCallback
          });

          //when
          var firstItem = fixture.find('.source .ui-selectee').first();

          //then
          runs(function () {
            firstItem.trigger('mousedown');
            firstItem.trigger('mouseup');
          });

          waitsFor(function () {
            return firstItem.hasClass('ui-selected');
          }, "first item should be selected", 500);

          runs(function () {
            fixture.find('.button-column .btn-add').first().click();
          });

          waitsFor(function () {
            return fixture.find('.target .ui-selectee').first().data('key') === firstItem.data('key');
          }, 'item should be moved to top of target list', 500);

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