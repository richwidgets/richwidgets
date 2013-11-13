define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/select/ordering-list', 'src/widgets/select/pick-list'], function () {

  describe('widget(pickList): callback:', function () {

    var fixture_list, element_list, original_list;
    var fixture_table, element_table, original_table;

    beforeEach(function () {
      var s = jasmine.getStyleFixtures();
      s.appendLoad('dist/assets/font-awesome/font-awesome.css');
      s.appendLoad('dist/assets/bootstrap/bootstrap.css');
      s.appendLoad('dist/assets/richwidgets/select/select-list.css');
      s.appendLoad('dist/assets/richwidgets/select/ordering-list.css');
      s.appendLoad('dist/assets/richwidgets/select/pick-list.css');

      var f = jasmine.getFixtures();
      f.load('test/widgets/select/pick-list/pick-list-source.html');

      fixture_list = $('#fixture-pick-list-list');
      original_list = fixture_list.clone();
      element_list = $('#list', fixture_list);
      fixture_table = $('#fixture-pick-list-table');
      original_table = fixture_table.clone();
      element_table = $('#table', fixture_table);
    });

    describe('lifecycle events: ', function () {
      it('create/destroy/addDomElementsCallback:', function () {
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
      it('focus/blur:', function () {
        function test(fixture, element) {
          // given
          var focusCallback = jasmine.createSpy('focusCallback');
          var blurCallback = jasmine.createSpy('blurCallback');

          element.pickList({
            focus: focusCallback,
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
          }, 'first item should be selected', 500);

          runs(function () {
            expect(focusCallback).toHaveBeenCalled();
            fixture.find('#blur').focus();
          });

          waitsFor(function () {
            return fixture.find('#blur').get(0) === document.activeElement;
          }, 'blur button has focus', 500);

          runs(function () {
            expect(blurCallback).toHaveBeenCalled();
          });
        }

        test(fixture_list, element_list);
        test(fixture_table, element_table);
      });

      describe('change by button click:', function () {
        it('btn-add:', function () {
          testChangeByButtonClick(fixture_list, element_list, 'btn-add');
          testChangeByButtonClick(fixture_table, element_table, 'btn-add');
        });

        it('btn-add-all:', function () {
          testChangeByButtonClick(fixture_list, element_list, 'btn-add-all');
          testChangeByButtonClick(fixture_table, element_table, 'btn-add-all');
        });

        it('btn-remove:', function () {
          testChangeByButtonClick(fixture_list, element_list, 'btn-remove');
          testChangeByButtonClick(fixture_table, element_table, 'btn-remove');
        });

        it('btn-remove-all:', function () {
          testChangeByButtonClick(fixture_list, element_list, 'btn-remove-all');
          testChangeByButtonClick(fixture_table, element_table, 'btn-remove-all');
        });

        function testChangeByButtonClick(fixture, element, buttonClass) {
          var changeCallback = jasmine.createSpy('changeCallback');

          element.pickList({ change: changeCallback });

          var list1 = buttonClass.indexOf('btn-add') === 0 ? '.source' : '.target';
          var list2 = buttonClass.indexOf('btn-add') === 0 ? '.target' : '.source';

          //when
          var firstItem = fixture.find(list1 + ' .ui-selectee').first();

          //then
          runs(function () {
            firstItem.trigger('mousedown');
            firstItem.trigger('mouseup');
          });

          waitsFor(function () {
            return firstItem.hasClass('ui-selected');
          }, 'first item should be selected', 500);

          runs(function () {
            fixture.find('.pick-button-column .' + buttonClass).first().click();
          });

          waitsFor(function () {
            return fixture.find(list2 + ' .ui-selectee').first().data('key') === firstItem.data('key');
          }, 'item should be moved to top of opposing list', 500);

          runs(function () {
            expect(changeCallback).toHaveBeenCalled();
          });
        }
      });

      describe('change by drag and drop:', function () {
        function test(fixture, element, dx, dy) {
          $('#container').width('800'); // set the container width so the mouse drags are repeatable across browsers
          var changeCallback = jasmine.createSpy('changeCallback');

          element.pickList({ change: changeCallback });

          var list1 = dx > 0 ? '.source' : '.target';
          var list2 = dx > 0 ? '.target' : '.source';

          //when
          var firstItem = fixture.find(list1 + ' .ui-selectee').first();

          //then
          runs(function () {
            firstItem.trigger('mousedown');
            firstItem.simulate('drag', {dx: dx, dy: dy});
            firstItem.trigger('mouseup');
          });

          waitsFor(function () {
            return fixture.find(list2 + ' .ui-selectee').first().data('key') === firstItem.data('key');
          }, 'item should be moved to top of opposing list', 1000);

          runs(function () {
            expect(changeCallback).toHaveBeenCalled();
          });
        }

        var dx = 400;
        it('drag to target:', function () {
          //different dy is because target list does not have <thead>
          //source list does have
          test(fixture_list, element_list, dx, 0);
          test(fixture_table, element_table, dx, -40);
        });

        it('drag to source:', function () {
          test(fixture_list, element_list, -dx, 0);
          test(fixture_table, element_table, -dx, 20);
        });
      });

    describe('change by item click/dblclick:', function () {
        function test(fixture, element, clickFromWhichList, event) {
          var changeCallback = jasmine.createSpy('changeCallback');
          
          // given
          element.pickList({ switchByClick : true });
          element.pickList({ switchByDblClick : true });
          element.pickList({ change: changeCallback });

          var list1 = clickFromWhichList.indexOf('source') === 0 ? '.source' : '.target';
          var list2 = clickFromWhichList.indexOf('source') === 0 ? '.target' : '.source';

          //when
          var firstItem = fixture.find(list1 + ' .ui-selectee').first();

          //then
          runs(function () {
            firstItem.trigger(event);
          });
          
          waitsFor(function () {
            return fixture.find(list2 + ' .ui-selectee').first().data('key') === firstItem.data('key');
          }, 'item should be moved to top of opposing list', 500);

          runs(function () {
            expect(changeCallback).toHaveBeenCalled();
          });
        }

        it('click to target:', function () {
          test(fixture_list, element_list, 'target', 'click');
          test(fixture_table, element_table, 'target', 'click');
        });

        it('click to source:', function () {
          test(fixture_list, element_list, 'source', 'click');
          test(fixture_table, element_table, 'source', 'click');
        });

        it('dbclick to target:', function () {
          test(fixture_list, element_list, 'target', 'dblclick');
          test(fixture_table, element_table, 'target', 'dblclick');
        });

        it('dbclick to source:', function () {
          test(fixture_list, element_list, 'source', 'dblclick');
          test(fixture_table, element_table, 'source', 'dblclick');
        });
      });
    });
  });
});