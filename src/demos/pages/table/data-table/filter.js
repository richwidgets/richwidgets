$('#filter').dataTable({
  header: 'Table layout',
  filter: function(event, ui) {
    var index = ui.table.find('thead th').index(ui.column);
    var tbody = ui.table.find('tbody');
    tbody.find('tr').each(function() {
      var row = this;
      var value = row.children[index].textContent;
      if (value.indexOf(ui.value) === 0) {
        row.style.display = 'table-row';
      } else {
        row.style.display = 'none';
      }
    });
  }
});
