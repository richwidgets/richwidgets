define(['lib/dom-compare/index', 'jquery'], function (domCompare, $) {

  beforeEach(function () {
    this.addMatchers({
      toHaveEqualDom: function(expected) {
        return expectToHaveEqualDom.call(this, innerHTML(this.actual), innerHTML(expected));
      },

      /**
       * Verifies that provided DOM nodes are equal including their subtrees
       */
      toHaveEqualOuterDom: function(expected) {
        return expectToHaveEqualDom.call(this, outerHTML(this.actual), outerHTML(expected));
      },

      /**
       * Verified that a provided DOM nodes subtree has same inner structure of nodes, ignoring the contents of provided nodes themselves.
       */
      toHaveEqualInnerDom: function(expected) {
        return expectToHaveEqualDom.call(this, innerHTML(this.actual), innerHTML(expected));
      }
    });
  });

  function innerHTML(e) {
    if ($.type(e) === 'string') {
      return $('<body>').html(e).get(0).innerHTML;
    }
    return $(e).get(0).innerHTML;
  }

  function outerHTML(e) {
    if ($.type(e) === 'string') {
      return $('<body>').html(e).get(0).outerHTML;
    }
    return $(e).get(0).outerHTML;
  }

  function expectToHaveEqualDom(actual, expected) {

    var result = expectEqualHtml(actual, expected);

    this.message = function() {

      var expectations = 'Expected: \n\n' + result.a.original + '\n\nbot got actual:\n\n' + result.b.original + '\n\nwhich is pretty-printed:\n\n' + result.b.pretty;
      return expectations + '\n\nReport:\n=======\n' + result.grouped;
    }

    if (!expected || expected.length == 0) {
      return false;
    }

    if (!actual || actual.length == 0) {
      return false;
    }

    return result.result;
  }

  function expectEqualHtml(b, a) {
    var body = $('<body>');
    body.get(0).innerHTML = a;
    var aNormalized = body.get(0);

    body = $('<body>');
    body.get(0).innerHTML = b;
    var bNormalized = body.get(0);

    var result = domCompare.compare(aNormalized, bNormalized);

    var grouped =  domCompare.GroupingReporter.report(result);

    var canonizingSerializerA = new (domCompare.XMLSerializer)();
    var canonizingSerializerB = new (domCompare.XMLSerializer)();

    return {
      result: result.getResult(),
      grouped: grouped,
      a: {
        original: a,
        pretty : canonizingSerializerA.serializeToString(aNormalized)
      },
      b: {
        original: b,
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