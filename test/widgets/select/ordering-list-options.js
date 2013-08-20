define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/select/orderingList'], function () {

  var key = jQuery.simulate.keyCode;

  describe('widget(orderingList): options:', function () {

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
        original = fixture.clone();
        element = $('#list', fixture);
      });

      afterEach(function () {
        // when
        element.orderingList('destroy');
        // then
        expect(fixture).toHaveEqualDom(original);
      });

      describe('header option:', function () {

        it('places the header option into the DOM', function () {
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
        });

        it('adds a header after initialized with no header', function () {
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
        });
      });

      describe('class options:', function () {
        it('sets the style class', function () {
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
          styleClass = 'newClass'
          // when
          element.orderingList('option', 'styleClass', styleClass);
          // then
          expect(fixture.find('.ordering-list').first().attr('class')).toEqual('ordering-list select-list ' + styleClass);
        });

        it('sets the header class', function () {
          // given
          var headerClass = 'myHeader';
          var options = {
            header: 'Test ordering list header',
            headerClass: headerClass
          };
          // when
          element.orderingList(options);
          // then
          expect(fixture.find('.ordering-list > .header').first().attr('class')).toEqual('header ' + headerClass);

          //given
          headerClass = 'newHeader'
          // when
          element.orderingList('option', 'headerClass', headerClass);
          // then
          expect(fixture.find('.ordering-list > .header').first().attr('class')).toEqual('header ' + headerClass);
        });

        it('sets the item class', function () {
          // given
          var itemClass = 'myClass';
          var options = {
            itemClass: itemClass
          };
          // when
          element.orderingList(options);
          // then
          expect(fixture.find('.ui-selectee').attr('class')).toMatch(itemClass);

          //given
          itemClass = 'newClass'
          // when
          element.orderingList('option', 'itemClass', itemClass);
          // then
          expect(fixture.find('.ui-selectee').attr('class')).toMatch(itemClass);
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

      describe('columnClasses option:', function () {

        it('uses the columnClasses option for layout', function () {
          // given
          var options = {
            header: 'Table layout w/ columnClasses',
            columnClasses: 'column-1 column-2'
          };
          // when
          element.orderingList(options);
          // then
          var getColumnClass = function (cells, index) {
            return $(cells.get(index)).attr('class');
          };
          var columnClasses = options.columnClasses.split(" ");
          var header_row_cells = fixture.find('thead th');
          expect(getColumnClass(header_row_cells, 0)).toMatch(columnClasses[0]);
          expect(getColumnClass(header_row_cells, 0)).not.toMatch(columnClasses[1]);
          expect(getColumnClass(header_row_cells, 1)).not.toMatch(columnClasses[0]);
          expect(getColumnClass(header_row_cells, 1)).toMatch(columnClasses[1]);
          expect(getColumnClass(header_row_cells, 2)).not.toMatch(columnClasses[0]);
          expect(getColumnClass(header_row_cells, 2)).not.toMatch(columnClasses[1]);
          var row_1_cells = fixture.find('tbody td');
          expect(getColumnClass(row_1_cells, 0)).toMatch(columnClasses[0]);
          expect(getColumnClass(row_1_cells, 0)).not.toMatch(columnClasses[1]);
          expect(getColumnClass(row_1_cells, 1)).not.toMatch(columnClasses[0]);
          expect(getColumnClass(row_1_cells, 1)).toMatch(columnClasses[1]);
          expect(getColumnClass(row_1_cells, 2)).not.toMatch(columnClasses[0]);
          expect(getColumnClass(row_1_cells, 2)).not.toMatch(columnClasses[1]);

          // given
          var newColumnClassString= 'foo-3 foo-4';

          // when
          element.orderingList('option', 'columnClasses', newColumnClassString);

          // then
          var newColumnClasses = newColumnClassString.split(" ");
          var header_row_cells = fixture.find('thead th');
          expect(getColumnClass(header_row_cells, 0)).not.toMatch(/column/);
          expect(getColumnClass(header_row_cells, 0)).toMatch(newColumnClasses[0]);
          expect(getColumnClass(header_row_cells, 0)).not.toMatch(newColumnClasses[1]);
          expect(getColumnClass(header_row_cells, 1)).not.toMatch(/column/);
          expect(getColumnClass(header_row_cells, 1)).not.toMatch(newColumnClasses[0]);
          expect(getColumnClass(header_row_cells, 1)).toMatch(newColumnClasses[1]);
          expect(getColumnClass(header_row_cells, 2)).not.toMatch(/column/);
          expect(getColumnClass(header_row_cells, 2)).not.toMatch(newColumnClasses[0]);
          expect(getColumnClass(header_row_cells, 2)).not.toMatch(newColumnClasses[1]);
          var row_1_cells = fixture.find('tbody td');
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
});