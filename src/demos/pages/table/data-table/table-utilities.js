/* global tableUtils: true */
tableUtils = (function () {
  return {
    showRange: function (table, first, last) {
      var rows = table.find('tbody').not('.scroller').find('tr').not('.filtered');
      rows.each(function (index) {
        var row = this;
        if (index >= first && index < last) {
          row.style.display = 'table-row';
        } else {
          row.style.display = 'none';
        }
      });
    },

    filterTable: function (table, filterMap) {
      var rows = table.find('tbody').not('.scroller').find('tr');
      if (!rows) {
        return;
      }
      var columnCount = rows[0].children.length;
      rows.each(function () {
        var row = this;
        for (var column = 0; column < columnCount; column++) {
          var filter = filterMap[column];
          var value = row.children[column].textContent;
          var test = !filter || (
            $.isNumeric(value) && $.isNumeric(filter) ? Number(value) <= Number(filter) : value.indexOf(filter) === 0
            );
          if (test) {
            row.style.display = 'table-row';
            row.className = '';
          } else {
            row.style.display = 'none';
            row.className = 'filtered';
            break;
          }
        }
      });
      var visibleSize = table.find('tbody').not('.scroller').find('tr:visible').length;
      table.dataTable('option', 'length', visibleSize);
    },

    sortTable: function (table, column, descending) {
      var tbody = table.find('tbody').not('.scroller');
      var rows = tbody.find('tr');
      var array = [];
      for (var i = 0; i < rows.length; i++) {
        array.push(rows[i]);
      }
      array.sort(function (a, b) {
        var aText = a.children[column].textContent;
        var bText = b.children[column].textContent;
        return $.isNumeric(aText) && $.isNumeric(bText) ? Number(aText) - Number(bText) : aText.localeCompare(bText);
      });
      if (descending) {
        array.reverse();
      }
      rows.detach();
      tbody.append(array);
    }
  };
})();