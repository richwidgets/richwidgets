/**
 * A widget for paging through other iterating widgets
 *
 * @module Table
 * @class dataScroller
 */
(function ($) {

  $.widget('rich.dataScroller', {

    options: {
      pageSize: 10,
      start: 0,
      size: null,
      target: null,
      // events
      next: null,
      previous: null
    },

    _create: function() {
      this.pageMax = this.options.size ? (Math.floor((this.options.size -1) / this.options.pageSize)) : 0;
      this.page = this.options.size ? (Math.floor(this.options.start / this.options.pageSize)) : 0;
      if (this.options.target) {
        this.connectWith(this.options.target);
      }
      this.updateStyle();
      this._attachEvents();
    },

    _attachEvents: function() {
      var widget = this;
      this.element.find('li').on('click', function(e) {
        var button = $(this);
        if (button.hasClass('first')) {
          widget.showPage(0);
        } else if (button.hasClass('next')) {
          widget.next();
        } else if (button.hasClass('previous')) {
          widget.previous();
        } else if (button.hasClass('last')) {
          widget.showPage(widget.pageMax);
        } else {
          widget.showPage(button.text() -1);
        }
        e.preventDefault();
      });
    },

    connectWith: function(element) {
      this.target = element;
    },

    previous: function() {
      var newPage = this.page - 1;
      if (newPage < 0) {
        return;
      } else {
        this.showPage(newPage);
      }
    },

    next: function() {
      var newPage = this.page + 1;
      if (this.pageMax && newPage > this.pageMax) {
        return;
      } else {
        this.showPage(newPage);
      }
    },

    showPage: function(page) {
      if (page < 0 || this.pageMax && page > this.pageMax) {
        return;
      }
      this.page = page;
      var first = page * this.options.pageSize;
      var last = first + this.options.pageSize - 1;
      this._trigger('scroll', null, {target: this.target, first: first, last: last});
      this.updateStyle();
    },

    updateStyle: function() {
      var elements = this.element.find('li');
      var widget = this;
      elements.each(function(index) {
        var button = $(this);
        if (button.hasClass('previous') || button.hasClass('first')) {
          if (widget.page === 0) {
            button.addClass('disabled');
          } else {
            button.removeClass('disabled');
          }
          return;
        }
        if (button.hasClass('next') || button.hasClass('last')) {
          if (widget.page === widget.pageMax) {
            button.addClass('disabled');
          } else {
            button.removeClass('disabled');
          }
          return;
        }
        if (button.text() === (widget.page + 1).toString()) {
          button.addClass('active');
        } else {
          button.removeClass('active');
        }
      });
    }

  });

}(jQuery));

