/* global tableUtils */
$('#scroll').dataTable();

$('#scroller').dataScroller({
  targetSelector: '#scroll',
  size: 50,
  fastStep: 2,
  scroll: function(event, ui) {
    tableUtils.showRange(ui.table, ui.first, ui.last);
  }
});

$('#scroll').dataTable('option', 'datatablesorted', function(event, ui) {
  $('#scroller').dataScroller('refresh');
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

})($('#scroll').data('richDataTable'), $('#scroller').data('richDataScroller'));