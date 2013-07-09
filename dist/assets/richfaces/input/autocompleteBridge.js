(function ($) {

  $.widget('rf.richAutocompleteBridge', $.rf.richAutocomplete, {

    _create: function() {
      this._super();

      this._setOption('source', $.proxy(function(request, response) {
        var done = $.proxy(function () {
          this._updateSuggestions();
          response(this.options.suggestions);
        }, this);

        var immediate = true;
        if ($.isFunction(this.options.update)) {
          // has the function second parameter? (which is done)
          if (this.options.update.length == 2) {
            immediate = false;
          }
          this.options.update.call(window, request, done);
        }
        if (immediate) {
          done();
        }
      }, this));

      if (this.options.choices) {
        this._setOption('choices', this.options.choices);
      }
    },

    _updateSuggestions: function() {
      var suggestions = [];
      var choices = this.choices = $(this.options.choices);
      var layout = this.LAYOUT.list;

      if (choices.is('table')) {
        layout = this.LAYOUT.table;
        choices =  choices.children('tbody');
      }
      $(choices).children('tr, li').each(function() {
        suggestions.push({
          value: $(this).data("label") || $(this).text(),
          html: $(this).clone()
        })
      });

      if (this.option('layout') !== layout) {
        this._setOption('layout', layout);
      }
      this._setOption('suggestions', suggestions);
    },

    _setOption: function(key, value) {
      this._super( key, value );
      if (key === 'choices') {
        this._updateSuggestions();
      }
    }
  });

}(jQuery));