define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/select/orderingList'], function () {

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

    describe('class options:', function () {
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

    describe('button options:', function () {

      it('applies the button text vlaues specified by the buttonText option', function () {
        function test(fixture, element) {
          // given
          var buttonsText = {first: "abcd", up: "efgh", down: "ijkl", last: "mnop"};
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
          buttonsText = {first: "qaz", up: "wsx", down: "edc", last: "rfv"};
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
    });

    describe('class options:', function () {

      it('uses the columnClasses option for layout', function () {
        // given
        var options = {
          header: 'Table layout w/ columnClasses',
          columnClasses: 'column-1 column-2'
        };
        // when
        element_table.orderingList(options);
        // then
        var getColumnClass = function (cells, index) {
          return $(cells.get(index)).attr('class');
        };
        var columnClasses = options.columnClasses.split(" ");
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
        var newColumnClasses = newColumnClassString.split(" ");
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
});