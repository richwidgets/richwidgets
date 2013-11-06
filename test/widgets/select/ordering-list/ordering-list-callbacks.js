
define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/select/ordering-list'], function () {

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
      it('addDomElements, create, destroy:', function () {
        function test(element) {
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
          // then
          expect(createCallback.callCount).toEqual(1);
          expect(addDomElementsCallback.callCount).toEqual(1);
          expect(destroyCallback).not.toHaveBeenCalled();

          // when
          element.orderingList('destroy');

          //then
          expect(addDomElementsCallback.callCount).toEqual(1);
          expect(createCallback.callCount).toEqual(1);
          expect(destroyCallback.callCount).toEqual(1);
        }

        test(element_list);
        test(element_table);
      });
    });

    describe('interaction events: ', function () {
      it('blur, focus:', function () {
        function test(fixture, element) {
          // given
          var focusCallback = jasmine.createSpy('focusCallback');
          var blurCallback = jasmine.createSpy('blurCallback');

          element.orderingList({
            focus: focusCallback,
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
          }, 'item should be selected', 500);

          runs(function () {
            expect(focusCallback.callCount).toEqual(1);
            expect(blurCallback).not.toHaveBeenCalled();
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
            expect(focusCallback.callCount).toEqual(1);
            expect(blurCallback.callCount).toEqual(1);
          });
        }

        test(fixture_list, element_list);
        test(fixture_table, element_table);
      });

      describe('change:', function () {
        describe('by button click:', function () {
          it('btn-first:', function () {
            test(fixture_list, element_list, 'btn-first', 5);
            test(fixture_table, element_table, 'btn-first', 5);
          });

          it('btn-last:', function () {
            test(fixture_list, element_list, 'btn-last', 1);
            test(fixture_table, element_table, 'btn-last', 1);
          });

          it('btn-up:', function () {
            test(fixture_list, element_list, 'btn-up', 3);
            test(fixture_table, element_table, 'btn-up', 3);
          });

          it('btn-down:', function () {
            test(fixture_list, element_list, 'btn-down', 3);
            test(fixture_table, element_table, 'btn-down', 3);
          });

          function test(fixture, element, buttonClass, startIndex) {
            var changeCallback = jasmine.createSpy('changeCallback');

            element.orderingList({change: changeCallback});

            // when
            var firstItem = fixture.find('.ui-selectee:eq(' + startIndex + ')');

            runs(function () {
              expect(changeCallback).not.toHaveBeenCalled();
            });

            // then
            runs(function () {
              firstItem.trigger('mousedown');
              firstItem.trigger('mouseup');
            });

            waitsFor(function () {
              return firstItem.hasClass('ui-selected');
            }, 'first item should be selected', 500);

            runs(function () {
              fixture.find('.button-column .' + buttonClass).click();
            });

            waitsFor(function () {
              switch (buttonClass) {
                case 'btn-down':
                  return element.find('.ui-selected').index() === _thresholdValue(startIndex + 1);
                case 'btn-up':
                  return element.find('.ui-selected').index() === _thresholdValue(startIndex - 1);
                case 'btn-first':
                  return element.find('.ui-selected').index() === 0;
                case 'btn-last':
                  return element.find('.ui-selected').index() === 7;
              }
            }, 'item should be moved', 500);

            runs(function () {
              expect(changeCallback.callCount).toEqual(1);
            });

            function _thresholdValue (value) {
              if (value < 0) {
                return 0;
              }
              if (value > 7) {
                return 7;
              }
              return value;
            }
          }
        });

        describe('by drag and drop:', function () {
          it('drag item down and back:', function () {
            test(element_list);
            test(element_table);
          });

          function test(element) {
            var changeCallback = jasmine.createSpy('changeCallback');

            element.orderingList({change: changeCallback});

            // when
            var item2 = element.find('.ui-selectee:contains(\'Item 2\')');
            var startIndex = item2.index();
            var expectedIndexAfterMove = item2.index() + 1;

            runs(function () {
              expect(changeCallback).not.toHaveBeenCalled();
            });

            // then
            runs(function () {
              item2.trigger('mousedown');
              item2.simulate('drag', {dy: 50});
              item2.trigger('mouseup');
            });

            waitsFor(function () {
              return item2.index() === expectedIndexAfterMove;
            }, 'item should be moved down', 500);

            runs(function () {
              expect(changeCallback.callCount).toEqual(1);
            });

            // move the item back
            runs(function () {
              item2.trigger('mousedown');
              item2.simulate('drag', {dy: -50});
              item2.trigger('mouseup');
            });

            waitsFor(function () {
              return item2.index() === startIndex;
            }, 'item should be moved up', 500);

            runs(function () {
              expect(changeCallback.callCount).toEqual(2);
            });
          }
        });
      });
    });

  });
});