/* global tableUtils */
$('#sort').dataTable({
  sort: function(event, ui) {
    var index = ui.sort.sequenceByIndex[0];
    tableUtils.sortTable(ui.table, index, ui.sort[index] === 'descending');
  }
});

$('#sortScroller').dataScroller({
  target: $('#sort'),
  size: 50,
  scroll: function(event, ui) {
    tableUtils.showRange(ui.table, ui.first, ui.last);
  }
});