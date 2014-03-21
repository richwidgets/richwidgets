/* global tableUtils */
$('#sort').dataTable({
  sort: function(event, ui) {
    tableUtils.sortTable(ui.table, ui.sort);
  }
});

$('#sortScroller').dataScroller({
  targetSelector: '#sort',
  size: 50,
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

})($('#sort').data('richDataTable'), $('#sortScroller').data('richDataScroller'));