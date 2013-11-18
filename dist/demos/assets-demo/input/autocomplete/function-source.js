var asyncSuggest = function (request, response) {
  setTimeout(function () {
    response($.ui.autocomplete.filter(source, request.term));
  }, 1000);
};

$('#function-source').autocomplete({ source: asyncSuggest });