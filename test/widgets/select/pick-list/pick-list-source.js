define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/select/orderingList', 'src/widgets/select/pickList'], function () {

  describe("widget(pickList): source", function () {

    beforeEach(function () {
      var f = jasmine.getFixtures();
      f.load('test/widgets/select/pick-list/pick-list-source.html');

      var s = jasmine.getStyleFixtures();
      s.appendLoad('dist/assets/bootstrap/bootstrap.css');
      s.appendLoad('dist/assets/font-awesome/font-awesome.css');
      s.appendLoad('dist/assets/richfaces/select/select-list.css');
      s.appendLoad('dist/assets/richfaces/select/ordering-list.css');
      s.appendLoad('dist/assets/richfaces/select/pick-list.css');
    });

    it("pick-list from <ol> markup", function () {
      // given
      var fixture = $("#fixture-pick-list-list");
      var original = fixture.clone();
      var element = $("#list", fixture);
      var expected = $("#expected-pick-list-list");
      var options = {
        header: "List layout"
      };
      // when
      element.pickList(options);
      // then
      expect(expected).toHaveEqualDom(fixture);
      // when
      element.pickList('destroy');
      // then
      expect(original).toHaveEqualDom(fixture);
    });

    it("pickList from <table> markup", function () {
      // given
      var fixture = $("#fixture-pick-list-table");
      var original = fixture.clone();
      var element = $("#table", fixture);
      var expected = $("#expected-pick-list-table");
      var options = {
        header: "Table layout"
      };
      // when
      element.pickList(options);
      // then
      expect(expected).toHaveEqualDom(fixture);
      // when
      element.pickList('destroy');
      // then
      expect(original).toHaveEqualDom(fixture);
    });

  });
});