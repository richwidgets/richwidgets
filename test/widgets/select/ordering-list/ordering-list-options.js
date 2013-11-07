define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/select/ordering-list'], function () {

  describe('widget(orderingList): options:', function () {

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

    afterEach(function () {
      if (element_list.data('orderingList') != null) {
        // when
        element_list.orderingList('destroy');
        // then
        expect(fixture_list).toHaveEqualInnerDom(original_list);
      }
      if (element_table.data('orderingList') != null) {
        // when
        element_table.orderingList('destroy');
        // then
        expect(fixture_table).toHaveEqualInnerDom(original_table);
      }
    });

    // option contained is tested in ordering-list-two-lists.js
    // option dropOnEmpty is tested in ordering-list-two-lists.js

    describe('header option:', function () {

      it('places the header option into the DOM', function () {
        function test(fixture, element) {
          // given
          var headerText = 'Test ordering list header';
          var options = {
            header: headerText
          };
          // when
          element.orderingList(options);
          // then
          expect(fixture.find('.ordering-list > .header').first().text()).toEqual(headerText);

          // given
          headerText = 'New header text';
          //when
          element.orderingList('option', 'header', headerText);
          // then
          expect(fixture.find('.ordering-list > .header').first().text()).toEqual(headerText);

        }

        test(fixture_list, element_list);
        test(fixture_table, element_table);
      });

      it('adds a header after initialized with no header', function () {
        function test(fixture, element) {
          // given
          var options = {};
          // when
          element.orderingList(options);
          // then
          expect(fixture.find('.ordering-list > .header').get(0)).toBeUndefined();

          // given
          var headerText = 'Test ordering list header';
          //when
          element.orderingList('option', 'header', headerText);
          // then
          expect(fixture.find('.ordering-list > .header').first().text()).toEqual(headerText);
        }

        test(fixture_list, element_list);
        test(fixture_table, element_table);
      });
    });

    describe('styleClass options:', function () {
      it('sets the style class', function () {
        function test(fixture, element) {
          // given
          var styleClass = 'myClass';
          var options = {
            styleClass: styleClass
          };
          // when
          element.orderingList(options);
          // then
          expect(fixture.find('.ordering-list').first().attr('class')).toEqual('ordering-list select-list ' + styleClass);

          //given
          styleClass = 'newClass';
          // when
          element.orderingList('option', 'styleClass', styleClass);
          // then
          expect(fixture.find('.ordering-list').first().attr('class')).toEqual('ordering-list select-list ' + styleClass);
        }

        test(fixture_list, element_list);
        test(fixture_table, element_table);
      });
    });

    describe('dragSelect options:', function () {
      it('when dragSelect is true, handle is visible', function () {
        function test(element) {
          // given
          var options = {
            dragSelect: true
          };
          // when
          element.orderingList(options);
          // then
          var items = element.find('.ui-selectee');
          expect(items.length).toEqual(8);
          for (var i = 0; i < items.length; i++) {
            expect($(items[i]).find('.handle > .icon-move').is(':visible')).toEqual(true);
          }
        }
        test(element_list);
        test(element_table);
      });

      it('when dragSelect is false, handle is not visible', function () {
        function test(element) {
          // given
          var options = {
            dragSelect: false
          };
          // when
          element.orderingList(options);
          // then
          var items = element.find('.ui-selectee');
          expect(items.length).toEqual(8);
          for (var i = 0; i < items.length; i++) {
            expect($(items[i]).find('.handle > .icon-move').is(':visible')).toEqual(false);
          }
        }
        test(element_list);
        test(element_table);
      });

      it('when dragSelect is true, then multiple items can be selected by mouse:', function () {
        testMultipleItemsCanBeSelectedByMouse(element_list, {dragSelect: true});
        testMultipleItemsCanBeSelectedByMouse(element_table, {dragSelect: true});
      });

      it('when dragSelect is true, items can be dragged by a handle:', function () {
        function test(fixture, element) {
          // given
          element.orderingList({dragSelect: true});
          var widget = element.data('orderingList');
          expect(widget._uiHash().orderedKeys).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
          // when
          var moveBy2Elements = 80;
          var item5 = fixture.find('.ui-selectee:contains(5)');
          var item5Handle = item5.find('.handle');
          //then
          runs(function () {
            item5Handle.trigger('mousedown');
            item5Handle.simulate('drag', {dy: moveBy2Elements});
            item5Handle.trigger('mouseup');
          });
          waitsFor(function () {
            return item5.hasClass('ui-selected');
          }, 'fifth item should be selected', 500);
          runs(function () {
            expect(widget._uiHash().orderedKeys).toEqual([1, 2, 3, 4, 6, 7, 5, 8]);
          });
          // move back
          runs(function () {
            item5Handle.trigger('mousedown');
            item5Handle.simulate('drag', {dy: -moveBy2Elements});
            item5Handle.trigger('mouseup');
          });
          waitsFor(function () {
            return item5.hasClass('ui-selected');
          }, 'fifth item should be selected', 500);
          runs(function () {
            expect(widget._uiHash().orderedKeys).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
          });
          runs(function () {
            // clear style after item selection so the afterEach function will pass
            // issue #83
            item5.removeAttr('style');
          });
        }
        test(fixture_list, element_list);
        test(fixture_table, element_table);
      });
    });

    describe('mouseOrderable options:', function () {
      it('when mouseOrderable is false, then multiple items can be selected by mouse: ', function () {
        testMultipleItemsCanBeSelectedByMouse(element_list, {mouseOrderable: false});
        testMultipleItemsCanBeSelectedByMouse(element_table, {mouseOrderable: false});
      });
    });

    describe('height options:', function () {
      it('height', function () {
        function test(fixture, element) {
          // given
          var heightToSet = '300px';
          var options = {
            height: heightToSet
          };
          // when
          element.orderingList(options);
          // then
          expect(fixture.find('.scroll-box').css('height')).toEqual(heightToSet);

          //given
          heightToSet = '400px';
          // when
          element.orderingList('option', 'height', heightToSet);
          // then
          expect(fixture.find('.scroll-box').css('height')).toEqual(heightToSet);
        }
        test(fixture_list, element_list);
        test(fixture_table, element_table);
      });

      it('heightMax', function () {
        function test(fixture, element) {
          // given
          var heightToSet = '300px';
          var options = {
            heightMax: heightToSet
          };
          // when
          element.orderingList(options);
          // then
          expect(fixture.find('.scroll-box').css('max-height')).toEqual(heightToSet);

          // change the heightMin option
          //given
          heightToSet = '400px';
          // when
          element.orderingList('option', 'heightMax', heightToSet);
          // then
          expect(fixture.find('.scroll-box').css('max-height')).toEqual(heightToSet);

          // change the height to be greater than max-height
          //given
          var newHeight = '500px';
          // when
          element.orderingList('option', 'height', newHeight);
          // then
          expect(fixture.find('.scroll-box').css('max-height')).toEqual(heightToSet);
          expect(fixture.find('.scroll-box').css('height')).toEqual(heightToSet);
          expect(fixture.find('.scroll-box').css('height')).not.toEqual(newHeight);
        }
        test(fixture_list, element_list);
        test(fixture_table, element_table);
      });

      it('heightMin', function () {
        function test(fixture, element) {
          // given
          var heightToSet = '300px';
          var options = {
            heightMin: heightToSet
          };
          // when
          element.orderingList(options);
          // then
          expect(fixture.find('.scroll-box').css('min-height')).toEqual(heightToSet);

          // change the heightMin option
          //given
          heightToSet = '400px';
          // when
          element.orderingList('option', 'heightMin', heightToSet);
          // then
          expect(fixture.find('.scroll-box').css('min-height')).toEqual(heightToSet);

          // change the height to be lesser than min-height
          //given
          var newHeight = '200px';
          // when
          element.orderingList('option', 'height', newHeight);
          // then
          expect(fixture.find('.scroll-box').css('min-height')).toEqual(heightToSet);
          expect(fixture.find('.scroll-box').css('height')).toEqual(heightToSet);
          expect(fixture.find('.scroll-box').css('height')).not.toEqual(newHeight);
        }
        test(fixture_list, element_list);
        test(fixture_table, element_table);
      });
    });

    describe('disabled options:', function () {
      it('disabled list', function () {
        // given
        var options = {
          disabled: true
        };
        // when
        element_list.orderingList(options);

        // list contains disabled classes
        expect(element_list.attr('class')).toEqual('list ui-sortable ui-selectable ui-sortable-disabled ui-selectable-disabled ui-state-disabled disabled');

        // items contain disabled classes
        var items = element_list.find('li');
        expect(items.length).toEqual(8);
        for (var i = 0; i < items.length; i++) {
          expect($(items[i]).attr('class')).toEqual('ui-disabled');
        }

        // buttons contain disabled classes
        var buttons = fixture_list.find('.btn');
        expect(buttons.length).toEqual(4);
        for (i = 0; i < buttons.length; i++) {
          expect($(buttons[i]).attr('disabled')).toEqual('disabled');
        }
      });

      it('disabled table', function () {
        // given
        var options = {
          disabled: true
        };
        // when
        element_table.orderingList(options);

        // table contains disabled classes
        expect(element_table.attr('class')).toEqual('list disabled');
        expect(element_table.find('tbody').attr('class')).toEqual('ui-sortable ui-selectable ui-sortable-disabled ui-selectable-disabled ui-state-disabled');

        // items contain disabled classes
        var items = element_table.find('tbody > tr');
        expect(items.length).toEqual(8);
        for (var i = 0; i < items.length; i++) {
          expect($(items[i]).attr('class')).toEqual('ui-disabled');
        }

        // buttons contain disabled classes
        var buttons = fixture_table.find('.btn');
        expect(buttons.length).toEqual(4);
        for (i = 0; i < buttons.length; i++) {
          expect($(buttons[i]).attr('disabled')).toEqual('disabled');
        }
      });
    });

    describe('button options:', function () {

      it('applies the button text values specified by the buttonText option', function () {
        function test(fixture, element) {
          // given
          var buttonsText = {first: 'abcd', up: 'efgh', down: 'ijkl', last: 'mnop'};
          var options = {
            buttonsText: buttonsText
          };
          // when
          element.orderingList(options);
          // then
          expect(fixture.find('.button-column .btn-first span').first().text()).toEqual(buttonsText.first);
          expect(fixture.find('.button-column .btn-up span').first().text()).toEqual(buttonsText.up);
          expect(fixture.find('.button-column .btn-down span').first().text()).toEqual(buttonsText.down);
          expect(fixture.find('.button-column .btn-last span').first().text()).toEqual(buttonsText.last);

          // given
          buttonsText = {first: 'qaz', up: 'wsx', down: 'edc', last: 'rfv'};
          // when
          element.orderingList('option', 'buttonsText', buttonsText);
          // then
          expect(fixture.find('.button-column .btn-first span').first().text()).toEqual(buttonsText.first);
          expect(fixture.find('.button-column .btn-up span').first().text()).toEqual(buttonsText.up);
          expect(fixture.find('.button-column .btn-down span').first().text()).toEqual(buttonsText.down);
          expect(fixture.find('.button-column .btn-last span').first().text()).toEqual(buttonsText.last);
        }

        test(fixture_list, element_list);
        test(fixture_table, element_table);
      });

      it('when showButtons option is false, then no buttons are visible', function () {
        function test(fixture, element) {
          // given
          var options = {
            showButtons: false
          };
          // when
          element.orderingList(options);
          // then
          expect(fixture.find('.button-column').is(':visible')).toBe(false);
          expect(fixture.find('.button-column .btn-first span').is(':visible')).toBe(false);
          expect(fixture.find('.button-column .btn-up span').is(':visible')).toBe(false);
          expect(fixture.find('.button-column .btn-down span').is(':visible')).toBe(false);
          expect(fixture.find('.button-column .btn-last span').is(':visible')).toBe(false);
        }

        test(fixture_list, element_list);
        test(fixture_table, element_table);
      });
    });

    describe('columnClasses options:', function () {

      it('uses the columnClasses option for table layout', function () {
        // given
        var options = {
          header: 'Table layout with columnClasses',
          columnClasses: 'column-1 column-2'
        };
        // when
        element_table.orderingList(options);
        // then
        var getColumnClass = function (cells, index) {
          return $(cells.get(index)).attr('class');
        };
        var columnClasses = options.columnClasses.split(' ');
        var header_row_cells = fixture_table.find('thead th');
        expect(getColumnClass(header_row_cells, 0)).toMatch(columnClasses[0]);
        expect(getColumnClass(header_row_cells, 0)).not.toMatch(columnClasses[1]);
        expect(getColumnClass(header_row_cells, 1)).not.toMatch(columnClasses[0]);
        expect(getColumnClass(header_row_cells, 1)).toMatch(columnClasses[1]);
        expect(getColumnClass(header_row_cells, 2)).not.toMatch(columnClasses[0]);
        expect(getColumnClass(header_row_cells, 2)).not.toMatch(columnClasses[1]);
        var row_1_cells = fixture_table.find('tbody td');
        expect(getColumnClass(row_1_cells, 0)).toMatch(columnClasses[0]);
        expect(getColumnClass(row_1_cells, 0)).not.toMatch(columnClasses[1]);
        expect(getColumnClass(row_1_cells, 1)).not.toMatch(columnClasses[0]);
        expect(getColumnClass(row_1_cells, 1)).toMatch(columnClasses[1]);
        expect(getColumnClass(row_1_cells, 2)).not.toMatch(columnClasses[0]);
        expect(getColumnClass(row_1_cells, 2)).not.toMatch(columnClasses[1]);
        // given
        var newColumnClassString = 'foo-3 foo-4';
        // when
        element_table.orderingList('option', 'columnClasses', newColumnClassString);
        // then
        var newColumnClasses = newColumnClassString.split(' ');
        header_row_cells = fixture_table.find('thead th');
        expect(getColumnClass(header_row_cells, 0)).not.toMatch(/column/);
        expect(getColumnClass(header_row_cells, 0)).toMatch(newColumnClasses[0]);
        expect(getColumnClass(header_row_cells, 0)).not.toMatch(newColumnClasses[1]);
        expect(getColumnClass(header_row_cells, 1)).not.toMatch(/column/);
        expect(getColumnClass(header_row_cells, 1)).not.toMatch(newColumnClasses[0]);
        expect(getColumnClass(header_row_cells, 1)).toMatch(newColumnClasses[1]);
        expect(getColumnClass(header_row_cells, 2)).not.toMatch(/column/);
        expect(getColumnClass(header_row_cells, 2)).not.toMatch(newColumnClasses[0]);
        expect(getColumnClass(header_row_cells, 2)).not.toMatch(newColumnClasses[1]);
        row_1_cells = fixture_table.find('tbody td');
        expect(getColumnClass(row_1_cells, 0)).not.toMatch(/column/);
        expect(getColumnClass(row_1_cells, 0)).toMatch(newColumnClasses[0]);
        expect(getColumnClass(row_1_cells, 0)).not.toMatch(newColumnClasses[1]);
        expect(getColumnClass(row_1_cells, 1)).not.toMatch(/column/);
        expect(getColumnClass(row_1_cells, 1)).not.toMatch(newColumnClasses[0]);
        expect(getColumnClass(row_1_cells, 1)).toMatch(newColumnClasses[1]);
        expect(getColumnClass(row_1_cells, 2)).not.toMatch(/column/);
        expect(getColumnClass(row_1_cells, 2)).not.toMatch(newColumnClasses[0]);
        expect(getColumnClass(row_1_cells, 2)).not.toMatch(newColumnClasses[1]);
      });
    });
  });

  function testMultipleItemsCanBeSelectedByMouse(element, listOptions) {
    // given
    element.orderingList(listOptions);
    var widget = element.data('orderingList');
    expect(widget._uiHash().orderedKeys).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    // when
    var item = $(element.find('.ui-selectee:contains(4)'));
    //then
    runs(function () {
      item.trigger('mousedown');
      item.simulate('drag', {dy: 80});
      item.trigger('mouseup');
    });
    
    waitsFor(function () {
      return element.find('.ui-selectee:contains(6)').hasClass('ui-selected');
    }, 'item to be selected', 500);
    
    runs(function () {
      expect(widget._createKeyArray(widget.getSelected())).toEqual([4, 5, 6]);
    });
  }
});
