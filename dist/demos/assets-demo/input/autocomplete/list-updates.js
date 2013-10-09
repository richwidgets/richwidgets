var counter = 1;

function updateDom() {
  $('#suggestions-updatable')
    .append($('<li>Test' + counter++ + '</li>'));
};

$("#updatable").richAutocomplete({
  source: '#suggestions-updatable',
  update: function (request, done) {
    setTimeout(function () {
      updateDom();
      done();
    }, 1000);
  }
});