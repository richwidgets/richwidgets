$('#cached').autocomplete({
  cached: true,
  minLength: 2,
  source: function (request, response) {
    setTimeout(function () {
      response($.ui.autocomplete.filter(source, request.term));
    }, 1000);
  }
});