(function() {
  var ready = '#428bca';
  var active = '#5cb85c';
  var waiting = '#f0ad4e';
  var stopped = '#d9534f';
  var originalBg = $('#timer').css('background-color');
  var originalColor = $('#timer').css('color');

  var options = {
    autostart: false,
    create: function(event, ui) {
      ui.element.css('background-color', ready);
      ui.element.css('color', 'white');
    },
    reset: function(event, ui) {
      ui.element.css('background-color', ready);
    },
    start: function(event, ui) {
      ui.element.css('background-color', active);
    },
    resume: function(event, ui) {
      ui.element.css('background-color', active);
    },
    pause: function(event, ui) {
      ui.element.css('background-color', waiting);
    },
    stop: function(event, ui) {
      ui.element.css('background-color', stopped);
    },
    destroy: function(event, ui) {
      ui.element.css('background-color', originalBg);
      ui.element.css('color', originalColor);
    }
  };

  $('#timer').stopwatch(options);

  window.richwidgets = window.richwidgets || {};
  window.richwidgets.timerOptions = options;
})();
