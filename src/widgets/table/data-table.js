/**
 * A widget providing hooks for sorting and filtering a data table.
 *
 * @module Table
 * @class dataTable
 */
(function ($) {

  $.widget('rich.dataTable', {

    options: {
      length: null,
      sortMode: 'single', // single, multi
      filterMode: 'multi', // single, multi
      /**
       * Fired when a sortable header is clicked.  A sortable header is a <th> element with the class 'sort' in <thead>.
       *
       * @event sort
       */
      sort: null,
      sorted: null,

      /**
       * Fired when a filterable element header is changed.  A filterable element is one marked with the class 'filter' in <thead>.
       *
       * @event filter
       */
      filter: null,
      filtered: null

    },

    _create: function () {
      if (!this.length) {
        this.length = this.element.find('tbody').not('.scroller').find('tr').length;
      }
      this.sortStates = [];
      this.filterStates = [];
      this._addSortEvents();
      this._addFilterEvents();
    },

    _addSortEvents: function() {
      var sortableHeaders = this.element.find('thead .sort');
      if (sortableHeaders) {
        var widget = this;
        sortableHeaders.on('click', function(e) {
          if (e.delegateTarget) {
            var sortHandle = e.delegateTarget;
            var column = sortHandle.tagName.toUpperCase() === 'TH' ? $(sortHandle) : $(sortHandle).parents('th').first();
            var sortOrder = widget._sortOrder(column) === 'ascending' ? 'descending' : 'ascending';
            if (e.metaKey || e.ctrlKey) {
              sortOrder = 'unsorted';
            }
            if (widget.options.sortMode === 'single') {
              widget._clearSortOrders(sortHandle);
            }
            widget._sortOrder(column,  sortOrder);
          }
          widget._trigger('sort', e, widget._dumpState());
          widget._trigger('sorted', e, widget._dumpState());
          e.preventDefault();
        });
      }
    },

    _addFilterEvents: function() {
      var widget = this;
      var inputFilters = this.element.find('thead input.filter');
      var callback = function(e) {
        var input = $(e.currentTarget);
        if (widget.options.filterMode === 'single') {
          widget._clearFilterValues(input);
        }
        var column = input.parents('th').first();
        widget._pushFilterState(column, input.val());
        widget._trigger('filter', e, widget._dumpState());
        widget._trigger('filtered', e, widget._dumpState());
      };

      if (inputFilters) {
        inputFilters.on('keyup', callback);
      }
      var selectFilters = this.element.find('thead select.filter');
      if (selectFilters) {
        selectFilters.on('change', callback);
      }
    },

    _clearSortOrders: function(current) {
      this.element.find('thead .sort').not(current).removeClass('ascending descending unsorted');
      this.sortStates = [];
    },

    _clearFilterValues: function(current) {
      this.element.find('thead .filter').not(current).val('');
    },

    // ascending, descending, unsorted
    _sortOrder: function(column, sortOrder) {
      if (arguments.length < 2) {
        if (column.hasClass('ascending')) {
          return 'ascending';
        }
        if (column.hasClass('descending')) {
          return 'descending';
        }
        return 'unsorted';

      } else {
        column.removeClass('ascending descending unsorted');
        column.addClass(sortOrder);
      }
      this._pushSortState(column, sortOrder);
    },

    _pushSortState: function(column, sortOrder) {
      var index = this._columnIndex(column);

      var id = column.attr('id');
      var newSortState = {
        id: id,
        index: index,
        column: column,
        sortOrder: sortOrder
      };

      this.sortStates = this.sortStates.filter(function(sortState) {
        return sortState.index !== newSortState.index;
      });

      if (newSortState.sortOrder !== 'unsorted') { // omit unsorted columns from the sort state
        this.sortStates.push(newSortState);
      }
    },

    _pushFilterState: function(column, filterValue) {
      var index = this._columnIndex(column);

      var id = column.attr('id');
      var newFilterState = {
        id: id,
        index: index,
        column: column,
        filterValue: filterValue
      };

      this.filterStates = this.filterStates.filter(function(filterState) {
        return filterState.index !== newFilterState.index;
      });

      this.filterStates.push(newFilterState); // push empty filters so we notify when a filter has been cleared
    },

    _dumpState: function() {
      var ui = {
        table: this.element,
        sort: this.sortStates, // array indexed by priority
        filter: this.filterStates, // array indexed by priority
        length: this.options.length
      };
      return ui;
    },

    _columnIndex: function(column) {
      var row = column.parents('tr').first();
      return row.find('th').index(column);
    }
  });

}(jQuery));

