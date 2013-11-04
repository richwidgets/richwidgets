var counter = 1;

function updateDom() {
  $('#updatable-suggestions').append($('<li>Test' + counter++ + '</li>'));
}

$('#updatable').autocomplete({
  source: '#updatable-suggestions',
  update: function (request, done) {
    setTimeout(function () {
      updateDom();
      done();
    }, 1000);
  }
});