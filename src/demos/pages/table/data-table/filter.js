/* global tableUtils */
$('#filter').dataTable({
  filter: function(event, ui) {
    tableUtils.filterTable(ui.table.find('tbody').not('.scroller'), ui.filter);
    var visibleSize = ui.table.find('tbody').not('.scroller').find('tr:visible').length;
    $('#filterScroller').dataScroller('option', 'size', visibleSize);
  },
  sort: function(event, ui) {
    var index = ui.sort.sequenceByIndex[0];
    tableUtils.sortTable(ui.table.find('tbody').not('.scroller'), index, ui.sort[index] === 'descending');
    $('#filterScroller').dataScroller('refresh');
  }
});

$('#filterScroller').dataScroller({
  target: $('#filter'),
  size: 121,
  pageSize: 10,
  scroll: function(event, ui) {
    tableUtils.showRange(ui.target, ui.first, ui.last);
  }
});