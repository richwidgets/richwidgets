(function ($) {

  $.widget('rf.richAutocompleteBridge', $.rf.richAutocomplete, {

    _setChoices: function(value) {
      var suggestions = [];
      var choices = this.choices = $(value);
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

      this._setOption('source', suggestions);
      this._setOption('layout', layout);
    },

    _setOption: function(key, value) {
      if (key === 'choices') {
        this._setChoices(value);
        return;
      }
      this._super( key, value );
    }
  });

}(jQuery));