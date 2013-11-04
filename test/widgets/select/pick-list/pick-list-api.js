define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/select/ordering-list', 'src/widgets/select/pick-list'], function () {

  describe('widget(pickList): public api methods:', function () {

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

    describe('removeItems/addItems: ', function () {
      
      it('removeItems: ', function () {
        test(fixture_list, element_list, 'removeItems');
        test(fixture_table, element_table, 'removeItems');
      });

      it('addItems: ', function () {
        test(fixture_list, element_list, 'addItems');
        test(fixture_table, element_table, 'addItems');
      });

      function test(fixture, element, method) {
        // given
        element.pickList();

        var targetList = (method.indexOf('remove') !== -1) ? '.source' : '.target';
        var sourceList = (method.indexOf('remove') !== -1) ? '.target' : '.source';
        //all elements except the first one
        var items = fixture.find(sourceList + ' .ui-selectee').first().siblings();

        // when
        runs(function () {
          element.pickList(method, items, 'click');
        });
        
        // then
        waitsFor(function () {
          var actualElement = fixture.find(targetList + ' .ui-selectee').first().get(0).textContent;
          var expectedElement = items.first().get(0).textContent;
          return actualElement === expectedElement;
        }, 'first item of the list of items should be moved to top of opposing list', 500);

        runs(function () {
          for (var i=0; i < (items.length - 1); i++) {
            var expectedElement = items.get(i).textContent;
            var targetElements = fixture.find(targetList + ' .ui-selectee');
            var actualElement = targetElements.get(i).textContent;
            expect(expectedElement).toEqual(actualElement);
          }
        });
      }
    });

    it('destroy: ', function() {
      function test(fixture, element) {
        // given
        element.pickList();

        // when
        runs(function () {
          element.pickList('destroy');
        });

        // then
        waitsFor(function () {
          try {
            //when invoking method on destroyed element an error should be thrown
            element.pickList('destroy');
          }
          catch(err) {
            return true;
          }
          return false;
        }, 'the pickList should be destroyed', 500);
      }

      test(fixture_list, element_list);
      test(fixture_table, element_table);
    });
  });
});