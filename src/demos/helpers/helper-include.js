(function() {
  module.exports.register = function(Handlebars, options) {
    var path  = require("path");
    var fs = require('fs');
    var grunt = require('grunt');
    var _     = grunt.util._;

    /*
     * Usage: {{ include [partial] }}
     */
    Handlebars.registerHelper("include", function(templateName, page) {
      // evaluate the template name for handlebars expressions with current context
      var template = Handlebars.compile(templateName)(this);

      var src = (!page.hash) ? page.src : this.page.src;

      var dir = path.dirname(src);
      var content = fs.readFileSync(dir + '/' + template, 'utf8');
      if (!content) {
        return new Handlebars.SafeString('File **' + template + '** not found.');
      }
      return new Handlebars.SafeString(content);
    });
  };
}).call(this);