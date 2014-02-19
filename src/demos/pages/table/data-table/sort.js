$('#sort').dataTable({
  header: 'Table layout',
  sort: function(event, ui) {
    var index = ui.table.find('thead th').index(ui.column);
    var tbody = ui.table.find('tbody');
    var rows =  tbody.find('tr');
    var array = [];
    for (var i = 0; i < rows.length; i++) {
      array.push(rows[i]);
    }
    array.sort(function(a,b) {
      var aText = a.children[index].textContent;
      var bText = b.children[index].textContent;
      return aText.localeCompare(bText);
    });
    if (ui.direction === 'decreasing') {
      array.reverse();
    }

    rows.detach();
    tbody.append(array);
  }
});
