(function() {
  module.exports.register = function(Handlebars, options) {
    var path  = require("path");
    var fs = require('fs');
    var grunt = require('grunt');
    var _     = grunt.util._;

    /*
     * Usage: {{ include [partial] }}
     */
    Handlebars.registerHelper("assets-demo", function() {
      if (typeof this.page === "undefined") {
        return "";
      }
      var dir = this.page.dirname;
      var assetsDemo = "dist/demos/assets-demo/"
      var relativePath = path.relative(dir, assetsDemo);
      return new Handlebars.SafeString(relativePath);
    });
  };
}).call(this);