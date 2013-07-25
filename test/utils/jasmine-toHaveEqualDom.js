define(['components/dom-compare/index', 'jquery'], function (domCompare, $) {

  beforeEach(function () {
    this.addMatchers({
      toHaveEqualDom: function(expected) {

        var result = expectEqualHtml(this.actual, expected);

        this.message = function() {

          var expectations = 'Expected \n\n' + result.a.pretty + '\n\nto be equal to\n\n' + result.b.pretty;
          return expectations + '\n\nReport:\n=======\n' + result.grouped;
        }

        if (!expected || expected.length == 0) {
          return false;
        }

        if (!this.actual || this.actual.length == 0) {
          return false;
        }

        return result.result;
      }
    })
  });

  function expectEqualHtml(a, b) {
    var body = $('<body>');
    body.html(a.html());
    var aNormalized = body.get(0);

    body = $('<body>');
    body.html(b.html());
    var bNormalized = body.get(0);

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

});