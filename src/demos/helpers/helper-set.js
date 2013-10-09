(function() {
  module.exports.register = function(Handlebars, options) {

    Handlebars.registerHelper("set", function(key, value, context) {

      var context = (!context.hash) ? context : this;
      var value = Handlebars.compile(value)(context);

      this[key] = value;
    });
  };
}).call(this);