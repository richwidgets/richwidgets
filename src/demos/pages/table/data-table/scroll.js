/* global tableUtils */
$('#scroll').dataTable();

$('#scroller').dataScroller({
  target: $('#scroll'),
  size: 50,
  scroll: function(event, ui) {
    tableUtils.showRange(ui.target, ui.first, ui.last);
  }
});