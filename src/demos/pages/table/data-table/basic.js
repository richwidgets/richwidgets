$('#basic').dataTable({});

$('.sub-table').subTable({
  expanded: true,

  toggle : function(event, ui) {
    ui.subTable.toggle();
  }
});

$('#subtable1-toggle').subTableToggle({
  targetSelector: '#subtable1'
});

$('#subtable2-toggle').subTableToggle({
  targetSelector: '#subtable2'
});