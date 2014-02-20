/**
 * A widget providing hooks for sorting and filtering a data table.
 *
 * @module Table
 * @class dataTable
 */
(function ($) {

  $.widget('rich.dataTable', {

    options: {
      /**
       * Fired when a sortable header is clicked.  A sortable header is a <th> element with the class 'sort' in <thead>.
       *
       * @event sort
       */
      sort: null,

      /**
       * Fired when a filterable element header is changed.  A filterable element is one marked with the class 'filter' in <thead>.
       *
       * @event filter
       */
      filter: null

    },

    _create: function () {
      this._addSortEvents();
      this._addFilterEvents();
    },

    _addSortEvents: function() {
      var sortableHeaders = this.element.find('thead .sort');
      if (sortableHeaders) {
        var widget = this;
        sortableHeaders.on('click', function(e) {
          var column = $(e.delegateTarget);
          var direction = column.hasClass('increasing') ? 'decreasing' : 'increasing';
          widget._trigger('sort', e, {table: widget.element, column: column, direction: direction});
          column.removeClass('increasing', 'decreasing');
          column.addClass(direction);
          e.preventDefault();
        });
      }
    },

    _addFilterEvents: function() {
      var widget = this;
      var inputFilters = this.element.find('thead input.filter');
      var callback = function(e) {
        var input = $(e.currentTarget);
        var column = input.parent('th');
        widget._trigger('filter', e, {table: widget.element, column: column, value: input.val()});
      };

      if (inputFilters) {
        inputFilters.on('keyup', callback);
      }
      var selectFilters = this.element.find('thead select.filter');
      if (selectFilters) {
        selectFilters.on('change', callback);
      }
    }

  });

}(jQuery));

