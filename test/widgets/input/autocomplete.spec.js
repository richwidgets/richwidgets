define(['/base/components/dom-compare/index.js', 'jquery', 'jquery-ui', 'widgets/input/autocomplete'], function (domCompare) {

  describe("Widget: Autocomplete", function () {

    beforeEach(function () {
      var f = jasmine.getFixtures();
      f.fixturesPath = 'base';
      f.load('test/widgets/input/autocomplete.spec.html');

      this.addMatchers({
        toHaveEqualDom: function(expected) {
          var result = expectEqualHtml(this.actual, expected);

          this.message = function() {

            var expectations = 'Expected \n\n' + result.a.pretty + '\n\nto be equal to\n\n' + result.b.pretty;
            return expectations + '\n\nReport:\n=======\n' + result.grouped;
          }

          return result.result;
        }
      })
    });

    afterEach(function () {
      var f = jasmine.getFixtures();
      f.cleanUp();
      f.clearCache();
    });

    function cleanWhitespace(node) {
      for (var i = 0; i < node.childNodes.length; i++) {
        var child = node.childNodes[i];
        if (child.nodeType == 3 && !/\S/.test(child.nodeValue)) {
          node.removeChild(child);
          i--;
        }
        if (child.nodeType == 1) {
          cleanWhitespace(child);
        }
      }
      return node;
    }

    function expectEqualHtml(a, b) {
      var div = $(document.createElement('div'));

      div.html(a);
      var aNormalized = div.find("> :first-child").get(0);

      div.html(b);
      var bNormalized = div.find("> :first-child").get(0);

      var result = domCompare.compare(aNormalized, bNormalized);

      var grouped =  domCompare.GroupingReporter.report(result);

      var canonizingSerializerA = new (domCompare.XMLSerializer)();

      var canonizingSerializerB = new (domCompare.XMLSerializer)();

      return {
        result: result.getResult(),
        grouped: grouped,
        a: {
          pretty : canonizingSerializerA.serializeToString(aNormalized)
        },
        b: {
          pretty : canonizingSerializerB.serializeToString(bNormalized)
        }
      }
    }

    it("initializes DOM correctly", function () {

      var fixture = $("#fixture");
      var expected = $("#expected");

      var element = $(".autocomplete", fixture);


      element.richAutocomplete({ source: ['Java', 'Haskell'] });
      expect(fixture.find("> :first-child")).toHaveEqualDom(expected.find("> :first-child"));
    });

  });

});