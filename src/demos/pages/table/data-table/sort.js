/* global tableUtils */
$('#sort').dataTable({
  sort: function(event, ui) {
    tableUtils.sortTable(ui.table, ui.sort);
  }
});

$('#sortScroller').dataScroller({
  target: $('#sort'),
  size: 50,
  scroll: function(event, ui) {
    tableUtils.showRange(ui.table, ui.first, ui.last);
  }
});