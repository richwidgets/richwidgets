$('#scroller').dataScroller({
  target: $('#scroll'),
  size: 50,
  scroll: function(event, ui) {
    var tbody = ui.target.find('tbody').not('.scroller');
    showRange(tbody, ui.first, ui.last);
  }
});

$('#scroll').dataTable();

function showRange(tbody, first, last) {
  tbody.find('tr').each(function(index) {
    var row = this;
    if (index >= first && index < last) {
      row.style.display = 'table-row';
    } else {
      row.style.display = 'none';
    }
  });
}

$.ready(showRange($('#scroll').find('tbody').not('.scroller'), 0, 9));