/**
 * A widget providing hooks for sorting and filtering a data table.
 *
 * @module Table
 * @class subTable
 */
(function ($) {

  $.widget('rich.subTable', {

    options: {
      expanded: true,
      /**
       * Fired to request expansion or collapse os the sub-table
       *
       * @event expand
       */
      toggle: null
    },

    _create: function() {
    },

    toggle: function(event, ui) {
      this._setState(! this.options.expanded, event, ui);
    },

    expand: function() {
      this._setState(true);
    },

    collapse: function() {
      this._setState(false);
    },

    expanded: function() {
      return this.options.expanded;
    },

    _setState: function(expandedValue, event, sourceUi) {
      this.options.expanded = expandedValue;
      var newUi = this._dumpState();
      newUi.sourceUi = sourceUi;
      this._trigger('toggle', event, newUi);
    },

    _dumpState: function() {
      var ui = {
        subTable: this.element,
        expanded: this.options.expanded
      };
      return ui;
    },

    _setOption: function (key, value) {
      var widget = this;
      if (this.options.key === value) {
        return;
      }
      switch (key) {
        case 'expanded':
          widget._setState(value);
          break;
      }
      this._super(key, value);
    },

    _destroy: function () {
      this._super();
    }
    });
}(jQuery));

