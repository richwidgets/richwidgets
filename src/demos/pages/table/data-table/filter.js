/* global tableUtils */
$('#filterScroller').dataScroller({
  target: $('#filter'),
  size: 121,
  pageSize: 10,
  scroll: function(event, ui) {
    tableUtils.showRange(ui.table, ui.first, ui.last);
  }
});

$('#filter').dataTable({
  filter: function(event, ui) {
    tableUtils.filterTable(ui.table, ui.filter);
  },
  sort: function(event, ui) {
    var index = ui.sort.sequenceByIndex[0];
    tableUtils.sortTable(ui.table, index, ui.sort[index] === 'descending');
  }
});

