/* global tableUtils */
$('#filter').dataTable({
  sortMode: 'multi',
  filter: function(event, ui) {
    // Accumulate the filters in a map to be re-applied later
    tableUtils.filterTable(ui.table, ui.filter);
  },
  sort: function(event, ui) {
    tableUtils.sortTable(ui.table, ui.sort);
  }
});

$('#filterScroller').dataScroller({
  targetSelector: '#filter',
  size: 121,
  pageSize: 10,
  scroll: function(event, ui) {
    tableUtils.showRange(ui.table, ui.first, ui.last);
  }
});

(function(table, scroller) {
  table._setOption('sorted', function(event, ui) {
    scroller.refresh();
    scroller.showPage(scroller.page);

  });

  table._setOption('filtered', function(event, ui) {
    scroller._setOption('size', ui.length);
    scroller.showPage(scroller.page);
  });

  $(document).ready(function() {
    scroller.refresh();
    scroller.showPage(scroller.page);
  });

})($('#filter').data('richDataTable'), $('#filterScroller').data('richDataScroller'));