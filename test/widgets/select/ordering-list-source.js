define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/select/orderingList'], function () {

  describe("widget(orderingList): source", function () {

    beforeEach(function () {
      var f = jasmine.getFixtures();
      f.load('test/widgets/select/ordering-list-source.html');

      var s = jasmine.getStyleFixtures();
      s.load('dist/assets/bootstrap/bootstrap.css');
      s.load('dist/assets/font-awesome/font-awesome.css');
      s.load('dist/assets/richfaces/select/select-list.css');
      s.load('dist/assets/richfaces/select/ordering-list.css');
    });

    it("ordering-list from <ol> markup", function () {
      // given
      var fixture = $("#fixture-ordering-list-list");
      var original = fixture.clone();
      var element = $("#list", fixture);
      var expected = $("#expected-ordering-list-list");
      var options = {
        header: "List layout" //caption
      };
      // when
      element.orderingList(options);
      // then
      expect(fixture).toHaveEqualDom(expected);
      // when
      element.orderingList('destroy');
      // then
      expect(fixture).toHaveEqualDom(original);
    });

    it("orderingList from <table> markup", function () {
      // given
      var fixture = $("#fixture-ordering-list-table");
      var original = fixture.clone();
      var element = $("#table", fixture);
      var expected = $("#expected-ordering-list-table");
      var options = {
        header: "Table layout" //caption
      };
      // when
      element.orderingList(options);
      // then
      expect(fixture).toHaveEqualDom(expected);
      // when
      element.orderingList('destroy');
      // then
      expect(fixture).toHaveEqualDom(original);
    });

  });
});