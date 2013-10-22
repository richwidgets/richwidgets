(function() {
  module.exports.register = function(Handlebars, options) {
    var path = require('path');

    Handlebars.registerHelper('href', function(from_dir, dest) {
      var to_dir = path.dirname(dest);
      var relativePath = path.relative(from_dir, to_dir);
      var basename = path.basename(dest) === 'index.html' ? '' : path.basename(dest);
      var href = relativePath ? relativePath + '/' + basename : basename;
      if (href === '') {
        href = '.';
      }
      return new Handlebars.SafeString(href);
    });

  };
}).call(this);