(function() {
  module.exports.register = function(Handlebars, options) {
    var path = require('path');

    Handlebars.registerHelper('href', function(from_dir, dest) {
      var to_dir = path.dirname(dest);
      var relativePath = path.relative(from_dir, to_dir);
      var href = relativePath ? relativePath + "/" + path.basename(dest) : path.basename(dest);
      return new Handlebars.SafeString(href);
    });

  };
}).call(this);