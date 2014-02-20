$('#sort').dataTable({
  sort: function(event, ui) {
    var index = ui.table.find('thead th').index(ui.column);
    sortTable(ui.table.find('tbody'), index, ui.direction === 'decreasing');
  }
});

function sortTable(tbody, column, decreasing) {
  var rows =  tbody.find('tr');
  var array = [];
  for (var i = 0; i < rows.length; i++) {
    array.push(rows[i]);
  }
  array.sort(function(a,b) {
    var aText = a.children[column].textContent;
    var bText = b.children[column].textContent;
    return aText.localeCompare(bText);
  });
  if (decreasing) {
    array.reverse();
  }

  rows.detach();
  tbody.append(array);
}