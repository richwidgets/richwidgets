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
  target: $('#filter'),
  size: 121,
  pageSize: 10,
  scroll: function(event, ui) {
    tableUtils.showRange(ui.table, ui.first, ui.last);
  }
});