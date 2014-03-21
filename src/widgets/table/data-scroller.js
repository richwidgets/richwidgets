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
      targetSelector: null,
      fastStep: 1,
      // events
      scroll: null
    },

    _create: function() {
      this._updatePageButtonDom();
      this.page = this.options.page ? this.options.page :
        this.options.size ? (Math.floor(this.options.start / this.options.pageSize)) : 0;
      this._updatePageButtonStyle();
      this._attachEvents();
    },

    _attachEvents: function() {
      var widget = this;
      this.element.on('click', 'li', function(e) {
        var button = $(this);
        if (button.hasClass('disabled')) {
          e.preventDefault();
          return;
        }
        if (button.hasClass('first')) {
          widget.showPage(0);
        } else if (button.hasClass('fast-previous')) {
          widget.showPage(widget.page - widget.options.fastStep);
        } else if (button.hasClass('previous')) {
          widget.previous();
        } else if (button.hasClass('next')) {
          widget.next();
        } else if (button.hasClass('fast-next')) {
          widget.showPage(widget.page + widget.options.fastStep);
        } else if (button.hasClass('last')) {
          widget.showPage(widget.pageMax);
        } else {
          widget.showPage(button.text() -1);
        }
        e.preventDefault();
      });
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
      if (page < 0) {
        page = 0;
      } else if (this.pageMax && page > this.pageMax) {
        page = this.pageMax;
      }
      this.page = page;
      var first = page * this.options.pageSize;
      var last = first + this.options.pageSize - 1;
      var ui = {
        table: this._$target(),
        first: first,
        last: last,
        page: page
      };
      this._trigger('scroll', null, ui);
      this._updatePageButtonStyle();
    },

    refresh: function() {
      this._updatePageButtonDom();
      this._updatePageButtonStyle();
    },

    _updatePageButtonStyle: function() {
      var elements = this.element.find('li');
      var widget = this;
      elements.each(function(index) {
        var button = $(this);
        if (button.hasClass('previous') || button.hasClass('fast-previous') || button.hasClass('first')) {
          if (widget.page === 0) {
            button.addClass('disabled');
          } else {
            button.removeClass('disabled');
          }
          return;
        }
        if (button.hasClass('next') || button.hasClass('fast-next') || button.hasClass('last')) {
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
    },

    _updatePageButtonDom: function() {
      if (!this.options.fastStep || this.options.fastStep.toString() === '1') {
        this.element.find('.fast-previous').hide();
        this.element.find('.fast-next').hide();
      }
      var pageButtons = this.element.find('li').filter(function() {
        var button = $(this);
        return ! (
          button.hasClass('first') ||
          button.hasClass('fast-previous') ||
          button.hasClass('previous') ||
          button.hasClass('next') ||
          button.hasClass('fast-next') ||
          button.hasClass('last')
          );
      });
      this.pageMax = this.options.size ? (Math.floor((this.options.size -1) / this.options.pageSize)) : 0;
      if (pageButtons.length < this.pageMax + 1) {
        var initial = pageButtons.length + 1;
        var previousButton = pageButtons.last();
        for (var i = initial; i <= this.pageMax +1; i++) {
          var button = $('<li><a href="#">'+i+'</a></li>');
          previousButton.after(button);
          previousButton = button;
        }
      } else if (pageButtons.length > this.pageMax + 1) {
        var final = pageButtons.length;
        for (var j = this.pageMax + 1; j < final; j++) {
          pageButtons[j].remove();
        }
        if (this.page > this.pageMax) {
          this.page = this.pageMax;
        }
      }
    },

    _setOption: function(key, value) {
      var widget = this;
      if (this.options.key === value) {
        return;
      }
      switch (key) {
        case 'size':
          widget.options.size = value;
          widget.refresh();
        break;
      }
      this._super(key, value);
    },

    _$target: function() {
      return this.options.targetSelector ? $(this.options.targetSelector) : null;
    },
  });

}(jQuery));

