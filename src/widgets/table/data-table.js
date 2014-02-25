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
      this.sortState = {
        sequenceByIndex: [],
        sequenceById: []
      };

      this.filterState = {};
      this._addSortEvents();
      this._addFilterEvents();
    },

    _addSortEvents: function() {
      var sortableHeaders = this.element.find('thead .sort');
      if (sortableHeaders) {
        var widget = this;
        sortableHeaders.on('click', function(e) {
          if (e.delegateTarget) {
            var column = e.delegateTarget.tagName.toUpperCase() === 'TH' ? $(e.delegateTarget) : $(e.delegateTarget).parents('th').first();
            var sortOrder = widget._currentSortOrder(column) === 'ascending' ? 'descending' : 'ascending';
            widget._storeSort(column,  sortOrder);
          }
          widget._trigger('sort', e, widget._dumpState());
          e.preventDefault();
        });
      }
    },

    _addFilterEvents: function() {
      var widget = this;
      var inputFilters = this.element.find('thead input.filter');
      var callback = function(e) {
        var input = $(e.currentTarget);
        if (input) {
          var column = input.parents('th').first();
          widget._storeFilter(column, input.val());
        }
        widget._trigger('filter', e, widget._dumpState());
      };

      if (inputFilters) {
        inputFilters.on('keyup', callback);
      }
      var selectFilters = this.element.find('thead select.filter');
      if (selectFilters) {
        selectFilters.on('change', callback);
      }
    },

    _storeSort: function(column, sortOrder) {
      var columnIndex = this._columnIndex(column);
      this.sortState[columnIndex] = sortOrder;
      this._pushSequence(columnIndex, this.sortState.sequenceByIndex);
      if (column.attr('id')) {
        var id = column.attr('id');
        this.sortState[id] = sortOrder;
        this._pushSequence(id, this.sortState.sequenceById);
      }
    },

    _storeFilter: function(column, filterValue) {
      var columnIndex = this._columnIndex(column);
      this.filterState[columnIndex] = filterValue;
      if (column.attr('id')) {
        var id = column.attr('id');
        this.filterState[id] = filterValue;
      }
    },

    // ascending, descending, unsorted
    _currentSortOrder: function(column) {
      var sortOrder;
      if (column.attr('id')) {
        sortOrder = this.sortState[column.attr('id')];
      } else {
        var columnIndex = this._columnIndex(column);
        sortOrder = this.sortState[columnIndex];
      }
      return sortOrder || 'unsorted';
    },

    _pushSequence: function(key, sequence) {
      var oldIndex = sequence.indexOf(key);
      if (oldIndex >= 0) {
        sequence.splice(oldIndex, 1);
      }
      sequence.splice(0,0,key);
    },

    _dumpState: function() {
      var ui = {
        table: this.element,
        sort: this.sortState,
        filter: this.filterState
      };
      return ui;
    },

    _columnIndex: function(column) {
      var row = column.parents('tr').first();
      return row.find('th').index(column);
    }
  });

}(jQuery));

