define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/select/orderingList'], function () {

  describe("widget(orderingList): source", function () {

    beforeEach(function () {
      var f = jasmine.getFixtures();
      f.load('test/widgets/select/orderingList-source.html');

      var s = jasmine.getStyleFixtures();
      s.load('dist/assets/bootstrap/bootstrap.css');
      s.load('dist/assets/font-awesome/font-awesome.css');
      s.load('dist/assets/richfaces/select/select-list.css');
      s.load('dist/assets/richfaces/select/ordering-list.css');
    });



    it("orderingList from <ol> markup", function () {
      // given
      var fixture = $("#fixture-orderingList-list");
      var original = fixture.clone();
      var element = $("#list", fixture);
      var expected = $("#expected-orderingList-list");
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

  });

});