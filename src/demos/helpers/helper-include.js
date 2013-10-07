(function() {
  module.exports.register = function(Handlebars, options) {
    var path  = require("path");
    var fs = require('fs');
    var grunt = require('grunt');
    var _     = grunt.util._;

    /*
     * Usage: {{ include [partial] }}
     */
    Handlebars.registerHelper("include", function(template, options) {
      var dir = path.dirname(this.page.src);
      console.log(dir);
      var content = fs.readFileSync(dir + '/' + template, 'utf8');
      if (!content) {
        return new Handlebars.SafeString('File **' + template + '** not found.');
      }
      return new Handlebars.SafeString(content);
    });
  };
}).call(this);