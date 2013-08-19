define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/select/orderingList'], function () {

  var key = jQuery.simulate.keyCode;

  describe('widget(orderingList): options', function () {

    beforeEach(function () {
      var f = jasmine.getFixtures();
      f.load('test/widgets/select/ordering-list-source.html');

      var s = jasmine.getStyleFixtures();
      s.load('dist/assets/bootstrap/bootstrap.css');
      s.load('dist/assets/font-awesome/font-awesome.css');
      s.load('dist/assets/richfaces/select/select-list.css');
      s.load('dist/assets/richfaces/select/ordering-list.css');
    });

    describe('widget(orderingList): options : list', function () {

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
    });

    describe('widget(orderingList): options : table', function () {

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
        var header_row_cells = fixture.find('thead th');
        expect(getColumnClass(header_row_cells, 0)).toMatch(/column-1/);
        expect(getColumnClass(header_row_cells, 0)).not.toMatch(/column-2/);
        expect(getColumnClass(header_row_cells, 1)).not.toMatch(/column-1/);
        expect(getColumnClass(header_row_cells, 1)).toMatch(/column-2/);
        expect(getColumnClass(header_row_cells, 3)).not.toMatch(/column-1/);
        expect(getColumnClass(header_row_cells, 3)).not.toMatch(/column-2/);
        var row_1_cells = fixture.find('tbody td');
        expect(getColumnClass(row_1_cells, 0)).toMatch(/column-1/);
        expect(getColumnClass(row_1_cells, 1)).toMatch(/column-2/);
        expect(getColumnClass(row_1_cells, 2)).not.toMatch(/column-1/);
        expect(getColumnClass(row_1_cells, 2)).not.toMatch(/column-2/);
      });

    });
  });
});