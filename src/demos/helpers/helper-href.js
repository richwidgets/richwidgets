(function() {

  var path = require('path');

  module.exports.register = function(Handlebars, options) {

    // Customize this helper
    Handlebars.registerHelper('href', function(dest) {
      var pathToStrip = "dist/demos";
      var href = dest;
      if (dest.indexOf(pathToStrip) === 0) {
        href = dest.substr(pathToStrip.length);
      }
      return new Handlebars.SafeString(href);
    });

  };
}).call(this);