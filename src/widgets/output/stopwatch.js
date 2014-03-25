/**
 * A stopwatch widget
 *
 * @module Output
 * @class chart
 */
(function ($) {

  $.widget('rich.stopwatch', {

    options: {
      autostart: true,
      direction: 'decreasing',
      showProgressBar: true,
      increment: 100 // in milliseconds
    },

    _create: function() {
      this.digitsElement = this.element.find('.digits');
      this.startTime = this.digits();
      this.digits(this.startTime);
      if (this.options.autostart) {
        this._createInterval();
      }
      if (this.options.showProgressBar) {
        this._addProgressBar();
      }
    },

    start: function() {
      if (this.isRunning()) {
        return;
      }
      this.reset();
      this._createInterval();
      this._trigger('start', undefined, this._dumpUi());
    },

    resume: function() {
      this._createInterval();
      this._trigger('resume', undefined, this._dumpUi());
    },

    pause: function() {
      this._removeInterval();
      this._trigger('pause', undefined, this._dumpUi());
    },

    stop: function() {
      this._removeInterval();
      this.digits(0);
    },

    reset: function() {
      this._removeInterval();
      this.digits(this.startTime);
      this._trigger('reset', undefined, this._dumpUi());
    },

    isRunning: function() {
      return !!this.intervalId;
    },

    digits: function(value) {
      if (typeof value === 'undefined') {
        return parseFloat(this.digitsElement.text());
      } else {
        this.digitsElement.text(value.toFixed(2));
        this._updateProgressBar();
        if (value <= 0) {
          this._trigger('stop', undefined, this._dumpUi());
        }
      }
    },

    _createInterval: function() {
      if (!this.intervalId && !this.options.disabled) {
        this.intervalId = setInterval($.proxy(this._decrementCount, this), this.options.increment);
      }
    },

    _removeInterval: function() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },

    _decrementCount: function() {
      var delta = this.options.increment/1000;
      var time = this.options.direction === 'increasing' ?
        this.digits() + delta : this.digits() - delta;
      if (time <= 0) {
        time = 0;
        this._removeInterval();
      }
      this.digits(time);
    },
    
    _addProgressBar: function() {
      if (this.options.direction === 'increasing') {
        return;
      }
      this.progressBar = $('<div class="progress-bar" style="width: 0%;" />');
      var progress = $('<div class="progress" />').append(this.progressBar);
      this._updateProgressBar();
      this.element.append(progress);
    },

    _updateProgressBar: function() {
      if (! this.progressBar) {
        return;
      }
      var value = 100 - (this.digits() / this.startTime * 100);
      this.progressBar.css('width', value.toFixed(4) + '%');
    },

    _getCreateEventData: function() {
      // called when the widget factory fires its create event
      return this._dumpUi();
    },

    _dumpUi: function() {
      return {
        element: this.element,
        digits: this.digits()
      };
    },

    _destroy: function() {
      this._removeInterval();
      if (this.progressBar) {
        this.progressBar.parents('.progress').first().remove();
      }
      this.digitsElement.text(this.startTime);
      this._trigger('destroy', undefined, this._dumpUi());
    }

  });
}(jQuery) );
