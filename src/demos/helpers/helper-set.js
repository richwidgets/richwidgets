(function() {
  module.exports.register = function(Handlebars, options) {

    Handlebars.registerHelper("set", function(key, valueName, context) {

      var relevantContext = (!context.hash) ? context : this;
      var value = Handlebars.compile(valueName)(relevantContext);

      this[key] = value;
    });
  };
}).call(this);