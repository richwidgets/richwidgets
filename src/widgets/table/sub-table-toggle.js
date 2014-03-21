/**
 * A widget providing hooks for sorting and filtering a data table.
 *
 * @module Table
 * @class subTableToggle
 */
(function ($) {

  $.widget('rich.subTableToggle', {

    options: {
      targetSelector: null
    },

    _create: function() {
      var widget = this;
      $(document).ready( function($) {
        widget.refreshStyleClass();
      });
      this.element.on('click', function(event) {
        widget.toggleSubTable(event);
        event.preventDefault();
      });
    },

    toggleSubTable: function(event) {
      var subTable = this._$target().subTable().data('richSubTable');
      subTable.toggle(event, {toggleElement: this.element});
      this.refreshStyleClass();
    },

    refreshStyleClass: function() {
      var styleClass = this._$target().subTable('expanded') ? 'expanded' : 'collapsed';
      this.element.removeClass('expanded collapsed');
      this.element.addClass(styleClass);
    },

    _$target: function() {
        return $(this.options.targetSelector);
    },

    _destroy: function () {
      this._super();
    }
  });
}(jQuery));

