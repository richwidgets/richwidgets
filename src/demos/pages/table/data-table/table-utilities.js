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
      rows.each(function () {
        var row = this;
        for (var filterIndex = 0; filterIndex < filterMap.length; filterIndex++) {
          var filter = filterMap[filterIndex];
          var columnIndex = filter.index;
          var filterValue = filter.filterValue;
          var cellValue = row.children[columnIndex].textContent;
          var isNumeric = $.isNumeric(cellValue) && $.isNumeric(filterValue);
          var showRow = !filterValue ||
            (isNumeric ? Number(cellValue) <= Number(filterValue) : cellValue.indexOf(filterValue) === 0);
          if (showRow) {
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

    sortTable: function (table, sortMap) {
      var tbody = table.find('tbody').not('.scroller');
      var rows = tbody.find('tr');
      var array = [];
      for (var i = 0; i < rows.length; i++) {
        array.push(rows[i]);
      }
      array.sort(function (a, b) {
        var result;
        for (var count = 0; count < sortMap.length; count++) {
          var columnIndex = sortMap[count].index;
          var aText = a.children[columnIndex].textContent;
          var bText = b.children[columnIndex].textContent;
          result = $.isNumeric(aText) && $.isNumeric(bText) ? Number(aText) - Number(bText) : aText.localeCompare(bText);
          if (sortMap[count].sortOrder === 'descending') {
            result = result * -1;
          }
          if (result !== 0) {
            break;
          }
        }
        return result;
      });
      rows.detach();
      tbody.append(array);
    }
  };
})();