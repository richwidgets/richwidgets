$('#filter').dataTable({
  filter: function(event, ui) {
    var index = ui.table.find('thead th').index(ui.column);
    filterTable(ui.table.find('tbody'), index, ui.value);
  }
});

function filterTable(tbody, column, filter) {
  tbody.find('tr').each(function() {
    var row = this;
    var value = row.children[column].textContent;
    if (value.indexOf(filter) === 0) {
      row.style.display = 'table-row';
    } else {
      row.style.display = 'none';
    }
  });
}