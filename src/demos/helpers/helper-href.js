(function() {
  module.exports.register = function(Handlebars, options) {
    var path = require('path');

    Handlebars.registerHelper('href', function(fromDir, dest) {
      var toDir = path.dirname(dest);
      var relativePath = path.relative(fromDir, toDir);
      var basename = path.basename(dest) === 'index.html' ? '' : path.basename(dest);
      var href = relativePath ? relativePath + '/' + basename : basename;
      if (href === '') {
        href = '.';
      }
      return new Handlebars.SafeString(href);
    });

  };
}).call(this);