define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/select/orderingList', 'src/widgets/select/pickList'], function () {

  describe('widget(pickList): options:', function () {

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

    afterEach(function () {
      if (element_list.data('pickList') != null) {
        // when
        element_list.pickList('destroy');
        // then
        expect(fixture_list).toHaveEqualInnerDom(original_list);
      }
      if (element_table.data('pickList') != null) {
        // when
        element_table.pickList('destroy');
        // then
        expect(fixture_table).toHaveEqualInnerDom(original_table);
      }
    });

    describe('header option:', function () {

      it('places the header option into the DOM', function () {
        function test(fixture, element) {
          // given
          var headerText = 'Test pick list header';
          var options = {
            header: headerText
          };
          // when
          element.pickList(options);
          // then
          expect(fixture.find('.pick-list > * > .header').first().text()).toEqual(headerText);

          // given
          headerText = 'New header text';
          //when
          element.pickList('option', 'header', headerText);
          // then
          expect(fixture.find('.pick-list > * > .header').first().text()).toEqual(headerText);

        }

        test(fixture_list, element_list);
        test(fixture_table, element_table);
      });

      it('adds a header after initialized with no header', function () {
        function test(fixture, element) {
          // given
          var options = {};
          // when
          element.pickList(options);
          // then
          expect(fixture.find('.pick-list > * > .header').get(0)).toBeUndefined();

          // given
          var headerText = 'Test pick list header';
          //when
          element.pickList('option', 'header', headerText);
          // then
          expect(fixture.find('.pick-list > * > .header').first().text()).toEqual(headerText);
        }

        test(fixture_list, element_list);
        test(fixture_table, element_table);
      });

      it('places the sourceHeader option into the DOM', function () {
        function test(fixture, element) {
          // given
          var headerText = 'Test pick list header';
          var options = {
            sourceHeader: headerText
          };
          // when
          element.pickList(options);
          // then
          expect(fixture.find('.pick-list .sub-header-row .source').first().text()).toEqual(headerText);

          // given
          headerText = 'New header text';
          //when
          element.pickList('option', 'sourceHeader', headerText);
          // then
          expect(fixture.find('.pick-list .sub-header-row .source').first().text()).toEqual(headerText);
        }

        test(fixture_list, element_list);
        test(fixture_table, element_table);
      });

      it('places the targetHeader option into the DOM', function () {
        function test(fixture, element) {
          // given
          var headerText = 'Test pick list header';
          var options = {
            targetHeader: headerText
          };
          // when
          element.pickList(options);
          // then
          expect(fixture.find('.pick-list .sub-header-row .target').first().text()).toEqual(headerText);

          // given
          headerText = 'New header text';
          //when
          element.pickList('option', 'targetHeader', headerText);
          // then
          expect(fixture.find('.pick-list .sub-header-row .target').first().text()).toEqual(headerText);
        }

        test(fixture_list, element_list);
        test(fixture_table, element_table);
      });

    });

    describe('class options:', function () {
      it('sets the style class', function () {
        function test(fixture, element) {
          // given
          var styleClass = 'myClass';
          var options = {
            styleClass: styleClass
          };
          // when
          element.pickList(options);
          // then
          expect(fixture.find('.pick-list').first().attr('class')).toEqual('container pick-list outer ' + styleClass);

          //given
          styleClass = 'newClass';
          // when
          element.pickList('option', 'styleClass', styleClass);
          // then
          expect(fixture.find('.pick-list').first().attr('class')).toEqual('container pick-list outer ' + styleClass);
        }

        test(fixture_list, element_list);
        test(fixture_table, element_table);
      });
    });

    describe('button options:', function () {

      it('applies the button text vlaues specified by the buttonText option', function () {
        function test(fixture, element) {
          // given
          var orderButtonsText = {first: 'abcd', up: 'efgh', down: 'ijkl', last: 'mnop'};
          var pickButtonsText = {addAll: 'fghj', add: 'vbmn', remove: 'rtyu', removeAll: 'dfgh'};
          var options = {
            orderButtonsText: orderButtonsText,
            pickButtonsText: pickButtonsText
          };
          // when
          element.pickList(options);
          // then
          expect(fixture.find('.target-wrapper .button-column .btn-first span').first().text()).toEqual(orderButtonsText.first);
          expect(fixture.find('.target-wrapper .button-column .btn-up span').first().text()).toEqual(orderButtonsText.up);
          expect(fixture.find('.target-wrapper .button-column .btn-down span').first().text()).toEqual(orderButtonsText.down);
          expect(fixture.find('.target-wrapper .button-column .btn-last span').first().text()).toEqual(orderButtonsText.last);

          expect(fixture.find('.middle .btn-remove-all span').first().text()).toEqual(pickButtonsText.removeAll);
          expect(fixture.find('.middle .btn-remove span').first().text()).toEqual(pickButtonsText.remove);
          expect(fixture.find('.middle .btn-add span').first().text()).toEqual(pickButtonsText.add);
          expect(fixture.find('.middle .btn-add-all span').first().text()).toEqual(pickButtonsText.addAll);

          // given
          orderButtonsText = {first: 'qaz', up: 'wsx', down: 'edc', last: 'rfv'};
          pickButtonsText = {first: 'qwe', up: 'wer', down: 'ert', last: 'rty'};
          // when
          element.pickList('option', 'orderButtonsText', orderButtonsText);
          // then
          expect(fixture.find('.target-wrapper .button-column .btn-first span').first().text()).toEqual(orderButtonsText.first);
          expect(fixture.find('.target-wrapper .button-column .btn-up span').first().text()).toEqual(orderButtonsText.up);
          expect(fixture.find('.target-wrapper .button-column .btn-down span').first().text()).toEqual(orderButtonsText.down);
          expect(fixture.find('.target-wrapper .button-column .btn-last span').first().text()).toEqual(orderButtonsText.last);
        }

        test(fixture_list, element_list);
        test(fixture_table, element_table);
      });
    });

    describe('class options:', function () {

      it('uses the columnClasses option for layout', function () {
        // given
        var options = {
          header: 'Table layout w/ columnClasses',
          columnClasses: 'column-1 column-2'
        };
        // when
        element_table.pickList(options);
        // then
        var getColumnClass = function (cells, index) {
          return $(cells.get(index)).attr('class');
        };
        var columnClasses = options.columnClasses.split(' ');
        var header_row_cells = fixture_table.find('.source-wrapper thead th');
        expect(getColumnClass(header_row_cells, 0)).toMatch(columnClasses[0]);
        expect(getColumnClass(header_row_cells, 0)).not.toMatch(columnClasses[1]);
        expect(getColumnClass(header_row_cells, 1)).not.toMatch(columnClasses[0]);
        expect(getColumnClass(header_row_cells, 1)).toMatch(columnClasses[1]);
        expect(getColumnClass(header_row_cells, 2)).not.toMatch(columnClasses[0]);
        expect(getColumnClass(header_row_cells, 2)).not.toMatch(columnClasses[1]);
        var row_1_cells = fixture_table.find('.source-wrapper tbody td');
        expect(getColumnClass(row_1_cells, 0)).toMatch(columnClasses[0]);
        expect(getColumnClass(row_1_cells, 0)).not.toMatch(columnClasses[1]);
        expect(getColumnClass(row_1_cells, 1)).not.toMatch(columnClasses[0]);
        expect(getColumnClass(row_1_cells, 1)).toMatch(columnClasses[1]);
        expect(getColumnClass(row_1_cells, 2)).not.toMatch(columnClasses[0]);
        expect(getColumnClass(row_1_cells, 2)).not.toMatch(columnClasses[1]);
        // given
        var newColumnClassString = 'foo-3 foo-4';
        // when
        element_table.pickList('option', 'columnClasses', newColumnClassString);
        // then
        var newColumnClasses = newColumnClassString.split(' ');
        header_row_cells = fixture_table.find('.source-wrapper thead th');
        expect(getColumnClass(header_row_cells, 0)).not.toMatch(/column/);
        expect(getColumnClass(header_row_cells, 0)).toMatch(newColumnClasses[0]);
        expect(getColumnClass(header_row_cells, 0)).not.toMatch(newColumnClasses[1]);
        expect(getColumnClass(header_row_cells, 1)).not.toMatch(/column/);
        expect(getColumnClass(header_row_cells, 1)).not.toMatch(newColumnClasses[0]);
        expect(getColumnClass(header_row_cells, 1)).toMatch(newColumnClasses[1]);
        expect(getColumnClass(header_row_cells, 2)).not.toMatch(/column/);
        expect(getColumnClass(header_row_cells, 2)).not.toMatch(newColumnClasses[0]);
        expect(getColumnClass(header_row_cells, 2)).not.toMatch(newColumnClasses[1]);
        row_1_cells = fixture_table.find('.source-wrapper tbody td');
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
});