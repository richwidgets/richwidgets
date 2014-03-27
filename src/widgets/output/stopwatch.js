/**
 * A stopwatch widget that can operate in either an 'increasing' mode (a stopwatch)
 * or in a 'decreasing' mode (a timer).
 *
 * @module Output
 * @class stopwatch
 */
(function ($) {

  $.widget('rich.stopwatch', {

    options: {
      /**
       * Whether to start the stopwatch on plugin execution
       *
       * @property autostart
       * @type Boolean
       * @default true
       */
      autostart: true,
      /**
       * Whether the widget should operate in an 'increasing' mode (a stopwatch)
       * or in a 'decreasing' mode (a timer).
       *
       * @property direction
       * @type String
       * @default 'decreasing'
       */
      direction: 'decreasing',
      /**
       * Disable the pickList widget
       *
       * @property disabled
       * @type Boolean
       * @default false
       */
      disabled: false,
      /**
       * Whether to display the progressbar when operating in the 'decreasing' direction
       *
       * @property autostart
       * @type Boolean
       * @default true
       */
      showProgressBar: true,
      /**
       * The amount by which to increment the stopwatch.  Value is given in milliseconds
       *
       * @property header
       * @type String
       * @default '100'
       */
      increment: 100,
      /**
       * Fired after the widget is created
       *
       * @event create
       */
      create: null,
      /**
       * Fired when the stopwatch starts
       *
       * @event start
       */
      start: null,
      /**
       * Fired when the stopwatch stops
       *
       * @event stop
       */
      stop: null,
      /**
       * Fired when the stopwatch is reset
       *
       * @event reset
       */
      reset: null,
      /**
       * Fired after the widget is destroyed
       *
       * @event destroy
       */
      destroy: null
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

    /**
     * Start the stopwatch
     * @method start
     * @chainable
     */
    start: function() {
      if (! this.isRunning()) {
        this.reset();
        this._createInterval();
      }
      return this;
    },

    /**
     * Resume from a paused state
     * @method resume
     * @chainable
     */
    resume: function() {
      this._createInterval();
      return this;
    },

    /**
     * Pause the stopwatch
     * @method pause
     * @chainable
     */
    pause: function() {
      this._removeInterval();
      return this;
    },

    /**
     * Stop the stopwatch, set the digits to 0
     * @method stop
     * @chainable
     */
    stop: function() {
      this.digits(0);
      this._removeInterval();
      return this;
    },

    /**
     * Stop the stopwatch, set the digits back to its initial value
     * @method reset
     * @chainable
     */
    reset: function() {
      if (!this.options.disabled) {
        this._removeInterval();
        this.digits(this.startTime);
        this._trigger('reset', undefined, this._dumpUi());
      }
      return this;
    },

    /**
     * Return true if the stopwatch is currently incrementing
     *
     * @method isRunning
     * @returns {boolean}
     */
    isRunning: function() {
      return !!this.intervalId;
    },

    /**
     * A getter/setter for the stopwatch digits
     *
     * @method digits
     * @param value
     * @returns {Number}
     */
    digits: function(value) {
      if (typeof value === 'undefined') {
        return parseFloat(this.digitsElement.text());
      } else if (! this.options.disabled) {
        if (value <= 0) {
          value = 0;
        }
        this.digitsElement.text(value.toFixed(2));
        this._updateProgressBar();
      }
    },

    _createInterval: function() {
      if (!this.intervalId && !this.options.disabled) {
        this.intervalId = setInterval($.proxy(this._decrementCount, this), this.options.increment);
        this._trigger('start', undefined, this._dumpUi());
      }
    },

    _removeInterval: function() {
      if (this.intervalId && !this.options.disabled) {
        clearInterval(this.intervalId);
        this.intervalId = null;
        this._trigger('stop', undefined, this._dumpUi());
      }
    },

    _decrementCount: function() {
      var delta = this.options.increment/1000;
      var time = this.options.direction === 'increasing' ?
        this.digits() + delta : this.digits() - delta;
      this.digits(time);
      if (time <= 0) {
        this._removeInterval();
      }
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

    _removeProgressBar: function() {
      if (this.progressBar) {
        this.progressBar.parents('.progress').first().remove();
        this.progressBar = null;
      }
    },

    _updateProgressBar: function() {
      if (! this.progressBar) {
        return;
      }
      var value = 100 - (this.digits() / this.startTime * 100);
      this.progressBar.css('width', value.toFixed(4) + '%');
    },

    _disable: function () {
      this._removeInterval();
      this.element.addClass('disabled');
    },

    _enable: function () {
      this.element.removeClass('disabled');
    },

    _dumpUi: function() {
      return {
        element: this.element,
        digits: this.digits()
      };
    },

    _getCreateEventData: function() {
      // called when the widget factory fires its create event
      return this._dumpUi();
    },

    _setOption: function (key, value) {
      var widget = this;
      if (this.options.key === value) {
        return;
      }
      switch (key) {
        case 'disabled':
          if (value === true) {
            widget._disable();
          } else {
            widget._enable();
          }
          break;
        case 'showProgressBar':
          if (value === true && !widget.progressBar) {
            widget._addProgressBar();
          } else if (value === false && widget.progressBar) {
            widget._removeProgressBar();
          }
          break;
      }
      this._super(key, value);
    },

    _destroy: function() {
      this._removeInterval();
      this._removeProgressBar();
      this.digitsElement.text(this.startTime);
      this._trigger('destroy', undefined, this._dumpUi());
    }

  });
}(jQuery) );
