(function ($) {

  $.widget('rf.orderingList', {

    options: {
      disabled: false,
      header: undefined,
      styleClass: undefined,
      columnClasses: undefined,
      showButtons: true,
      buttonsText: undefined, // {first: ..., up: ..., down: ..., last: ...}
      contained: true,
      dragSelect: false,
      dropOnEmpty: true,
      mouseOrderable: true,
      widgetEventPrefix: 'orderingList_'
    },

    _create: function () {
      var self = this;
      this.selectableOptions = {
        disabled: self.options.disabled,
      };
      this.sortableOptions = { handle: this.options.dragSelect ? ".handle" : false,
        disabled: this.options.disabled,
        dropOnEmpty: this.options.dropOnEmpty,
        scroll: true,
        placeholder: "placeholder",
        tolerance: "pointer",
        start: function (event, ui) {
          self.currentItems = ui.item.parent().children('.ui-selected').not('.placeholder').not('.helper-item');
          var helper = ui.helper;
          var placeholder = self.element.find('.placeholder');
          placeholder.css('height', helper.css('height'));

          self.currentItems.not(ui.item).hide();
        },
        sort: function (event, ui) {
          var that = $(this);
          var helperTop = ui.helper.position().top,
            helperBottom = helperTop + ui.helper.outerHeight();
          that.children('.ui-selectee').not('.placeholder').not('.helper-item').not('.ui-selected').each(function () {
            var item = $(this);
            var itemTop = item.position().top;
            var itemMiddle = item.position().top + item.outerHeight() / 2;
            /* if the helper overlaps half of an item, move the placeholder */
            if (helperTop < itemMiddle && itemMiddle < helperBottom) {
              if (itemTop > helperTop) {
                $('.placeholder', that).insertAfter(item);
              } else {
                $('.placeholder', that).insertBefore(item);
              }
              return false;
            }
          });
        },
        cancel: function (event, ui) {
          self.currentItems.show();
        },
        receive: function (event, ui) {
          ui.item.after(ui.sender.find(".ui-selected"));
          var newUi = self._dumpState();
          newUi.originalEvent = event;
          self._trigger("receive", event, newUi);
        },
        beforeStop: function (event, ui) {
        },
        stop: function (event, ui) {
          var first = self.currentItems.first();
          if (first.get(0) !== ui.item.get(0)) {
            ui.item.before(first);
            first.after(self.currentItems.not(first).detach());
          } else {
            ui.item.after(self.currentItems.not(ui.item).detach());
          }
          self.currentItems.not('.placeholder').show();
          var ui = self._dumpState();
          ui.movement = 'drag';
          self._trigger("change", event, ui);
        }
      };
      if (this.element.is("table")) {
        this.strategy = "table";
        this.$pluginRoot = $(this.element).find("tbody");
        this.selectableOptions.filter = "tr";
        this.sortableOptions.helper = $.proxy(this._rowHelper, this);
      } else {
        this.strategy = "list";
        this.$pluginRoot = $(this.element);
        this.selectableOptions.filter = "li";
        this.sortableOptions.helper = $.proxy(this._listHelper, this);
      }
      if (this.options.contained !== false) {
        this.sortableOptions.containment = this.$pluginRoot;
        this.sortableOptions.axis = "y";
      }
      // if mouse ordering is disabled buttons have to be shown
      this._addDomElements();
      this.widgetEventPrefix = this.options.widgetEventPrefix;
      if (this.options.mouseOrderable === true) {
        this.$pluginRoot.sortable(this.sortableOptions);
      }

      this.$pluginRoot.selectable(this.selectableOptions);
      if (this.options.disabled === true) {
        self._disable();
      }
      var selector = '.handle';
      this._addDragListeners();
    },

    destroy: function () {
      $.Widget.prototype.destroy.call(this);
      this._removeDomElements();
      this.$pluginRoot
        .sortable("destroy")
        .selectable("destroy");

      // remove empty class attributes                             y
      if (!this.element.attr('class')) {
        this.element.removeAttr("class");
      }
      var that = this;
      if (that.strategy === 'table') {
        this.element.children().each(function () {
          var $part = $(this);
          if (!$part.attr('class')) {
            $part.removeAttr("class");
          }
          $part.children().each(function () {
            var $row = $(this);
            if (!$row.attr('class')) {
              $row.removeAttr("class");
            }
            $row.children().each(function () {
              var $cell = $(this);
              if (!$cell.attr('class')) {
                $cell.removeAttr("class");
              }
            });
          });
        });
      } else {
        this.element.children().each(function () {
          var $selectable = $(this);
          if (!$selectable.attr('class')) {
            $selectable.removeAttr("class");
          }
        });
        return this;
      }
    },

    _addDragListeners: function() {
      if (this.options.dragSelect == false) {
        this.element.on("mousedown", '.ui-selectee', function (event) {
          var item = $(this);
          var list = item.parents('.list').first();
          list.data('rfOrderingList').mouseStarted = true;
        });
        this.$pluginRoot.on("mousemove", '.ui-selectee', function (event) {
          var item = $(this);
          var list = item.parents('.list').first();
          var orderingList = list.data('rfOrderingList');
          if (orderingList.mouseStarted) {
            orderingList.mouseStarted = false;
            if (!item.hasClass('ui-selected')) {
              var selectable = orderingList.$pluginRoot.data('uiSelectable');
              selectable._mouseStart(event);
              selectable._mouseStop(event);
            }
          }
        });
        this.element.on("mouseup", '.ui-selectee', function (event) {
          var item = $(this);
          var list = item.parents('.list').first();
          var orderingList = list.data('rfOrderingList');
          if (orderingList.mouseStarted) {
            orderingList.mouseStarted = false;
            var selectable = orderingList.$pluginRoot.data('uiSelectable');
            selectable._mouseStart(event);
            selectable._mouseStop(event);
          }
        });
      } else {
        this.element.find('.handle').on("mousedown", function (event) {
          var item = $(this).parents('.ui-selectee').first();
          if (!item.hasClass('ui-selected')) {
            var list = item.parents('.list').first();
            var selectable = list.data('rfOrderingList').$pluginRoot.data('uiSelectable');
            selectable._mouseStart(event);
            selectable._mouseStop(event);
          }
        });
      }
    },

    _removeDragListeners: function() {
      if (this.options.dragSelect == false) {
        this.element.off("mousedown", '.ui-selectee');
        this.element.off("mousemove", '.ui-selectee');
        this.element.off("mouseup", '.ui-selectee');
      } else {
        this.element.find('.handle').off("mousedown");
      }
    },

    _listHelper: function (e, item) {
      var $helper = $("<ol />").addClass('helper')
        .css('height', 'auto').css('width', this.element.css('width'));
      item.parent().children('.ui-selected').not('.ui-sortable-placeholder').clone().addClass("helper-item").show().appendTo($helper);
      return $helper;
    },

    _rowHelper: function (e, item) {
      var $helper = $("<div />").addClass('helper').css('height', 'auto');
      item.parent().children('.ui-selected').not('.ui-sortable-placeholder').clone().addClass("helper-item").show().appendTo($helper);
      /* we lose the cell width in the clone, so we re-set it here: */
      var firstRow = $helper.children("tr").first();
      /* we only need to set the column widths on the first row */
      firstRow.children().each(function (colindex) {
        var originalCell = item.children().get(colindex);
        var originalWidth = $(originalCell).css('width');
        $(this).css('width', originalWidth);
      });
      return $helper;
    },

    _setOption: function (key, value) {
      var that = this;
      if (this.options.key === value) {
        return;
      }
      switch (key) {
        case "disabled":
          if (value === true) {
            that._disable();
          } else {
            that._enable();
          }
          break;
        case "header":
          if (!that.header) {
            that._addHeader();
          }
          that.header.text(value);
          break;
        case "columnClasses":
          if (that.options.columnClasses) {
            that._removeColumnClasses(that.options.columnClasses);
          }
          that._addColumnClasses(value);
          break;
        case "styleClass":
          if (that.options.styleClass) {
            that.selectList.removeClass(this.options.styleClass);
          }
          that.selectList.addClass(value);
          break;
        case "buttonsText":
          this._applyButtonsText(this.selectList.find('.btn-group-vertical'), value);
          break;
      }
      $.Widget.prototype._setOption.apply(that, arguments);
    },

    _createKeyArray: function (items) {
      var keys = new Array();
      items.each(function () {
        var $this = $(this);
        var dataKey = $this.data('key');
        var key = (dataKey) ? dataKey : $this.text();
        keys.push(key);
      })
      return keys;
    },

    /** Public API methods **/

    connectWith: function (target) {
      var orderingList = target.data("rfOrderingList");
      this.$pluginRoot.sortable("option", "connectWith", orderingList.$pluginRoot);
    },

    isSelected: function (item) {
      return $(item).hasClass('ui-selected');
    },

    getSelected: function() {
      return this.element.find('.ui-selected');
    },

    selectItem: function (item) {
      $(item).addClass('ui-selected');
    },

    unSelectItem: function (item) {
      $(item).removeClass('ui-selected');
    },

    unSelectAll: function () {
      var self = this;
      this._removeDomElements();
      this.element.children().each(function () {
        self.unSelectItem(this);
      });
    },

    moveTop: function (items, event) {
      if (this.options.disabled) return;
      var first = items.prevAll().not('.ui-selected').last();
      $(items).insertBefore(first);
      var ui = this._dumpState();
      ui.movement = 'moveTop';
      this._trigger("change", event, ui);
    },

    moveUp: function (items, event) {
      if (this.options.disabled) return;
      $(items).each(function () {
        var $item = $(this);
        var prev = $item.prevAll().not('.ui-selected').first();
        if (prev.length > 0) {
          $item.insertBefore(prev);
        }
      });
      var ui = this._dumpState();
      ui.movement = 'moveUp';
      this._trigger("change", event, ui);
    },

    moveDown: function (items, event) {
      if (this.options.disabled) return;
      $(items).sort(function () {
        return 1
      }).each(function () {
        var $item = $(this);
        var next = $item.nextAll().not('.ui-selected').first();
        if (next.length > 0) {
          $item.insertAfter(next);
        }
      });
      var ui = this._dumpState();
      ui.movement = 'moveDown';
      this._trigger("change", event, ui);
    },

    moveLast: function (items, event) {
      if (this.options.disabled) return;
      var last = items.nextAll().not('.ui-selected').last();
      $(items).insertAfter(last);
      var ui = this._dumpState();
      ui.movement = 'moveLast';
      this._trigger("change", event, ui);
    },

    getOrderedElements: function () {
      return this.element.find('.ui-selectee');
    },

    getOrderedKeys: function () {
      return (this._createKeyArray( this.getOrderedElements()));
    },

    /** Initialisation methods **/

    _addDomElements: function () {
      this._addParents();
      this._addMouseHandles();
      if (this.options.showButtons === true) {
        this._addButtons();
      }
      if (this.strategy === 'table') { /* round the table row corners */
        var that = this;
        $(this.element).find("tr").each(function () {
            var $tr = $(this);
            var children = $tr.children();
            children.last().addClass('last');
            children.first().addClass('first');
            if (that.options.columnClasses) {
              that._addColumnClassesToCells(children, that.options.columnClasses);
            }
          })
      }
    },

    _addColumnClasses: function(columnClasses) {
      if (this.strategy !== 'table') {
        return;
      }
      var that = this;
      $(this.element).find('tr').each(function () {
          that._addColumnClassesToCells($(this).children(), columnClasses);
        });
    },

    _addColumnClassesToCells: function(cells, columnClasses) {
      var columnClasses = columnClasses.split(" ");
      cells.each(function(count) {
        if (count < columnClasses.length) {
          $(this).addClass(columnClasses[count]);
        } else {
          return false;
        }
      });
    },

    _addButtons: function () {
      var buttonStack = $("<div/>")
        .addClass("btn-group-vertical");
      this._addButton(buttonStack, "first", 'icon-arrow-up', $.proxy(this._firstHandler, this));
      this._addButton(buttonStack, "up", 'icon-arrow-up', $.proxy(this._upHandler, this));
      this._addButton(buttonStack, "down", 'icon-arrow-down', $.proxy(this._downHandler, this));
      this._addButton(buttonStack, "last", 'icon-arrow-down', $.proxy(this._lastHandler, this));
      if (this.options.buttonsText) {
        this._applyButtonsText(buttonStack, this.options.buttonsText);
      }
      this.content.append(
        $('<div />').addClass('buttonColumn').append(buttonStack));
    },

    _applyButtonsText: function(buttonStack, buttonsText) {
      this._applyButtonText(buttonStack.find('.first'), buttonsText.first);
      this._applyButtonText(buttonStack.find('.up'), buttonsText.up);
      this._applyButtonText(buttonStack.find('.down'), buttonsText.down);
      this._applyButtonText(buttonStack.find('.last'), buttonsText.last);
    },

    _applyButtonText: function(button, text) {
      if (!text) {
        if (button.hasClass('labeled')) {
          button.removeClass('labeled');
          button.find('span').remove();
        }
        return;
      }
      if (button.hasClass('labeled')) {
        button.find('span').text(text);
      } else {
        button.addClass("labeled").append($("<span />").text(text));
      }
    },

    _addButton: function (buttonStack, buttonClass, icon, handler) {
      var button = $("<button/>")
        .attr('type', 'button')
        .addClass("btn btn-default")
        .addClass(buttonClass)
        .bind('click.orderingList', handler)
        .append($("<i />").addClass(icon));
      buttonStack.append(button);
    },

    _addMouseHandles: function () {
      if (this.options.mouseOrderable !== true) {
        return
      }
      if (this.options.dragSelect === true) {
        this.content.addClass('with-handle');
        if (this.strategy === 'table') {
          $(this.element)
            .find("tbody > tr")
            .prepend("<th class='handle'><i class='icon-move'></i></th>");
          $(this.element)
            .find("thead > tr")
            .prepend("<th class='handle'></th>");
        } else if (this.strategy === 'list') {
          $(this.element)
            .find("li")
            .prepend("<div class='handle'><i class='icon-move'></i></div>");
        }
      }
    },

    _addParents: function () {
      this.element.addClass('list').wrap(
        $("<div />").addClass('ordering-list select-list').append(
          $('<div />').addClass('content').append(
            $('<div />').addClass('listBox')
          )
        )
      );
      this.selectList = this.element.parents(".select-list").first();
      if (this.options.styleClass) {
        this.selectList.addClass(this.options.styleClass);
      }
      if (this.options.header) {
        this._addHeader();
      }
      this.content = this.selectList.find(".content");
    },

    _addHeader: function() {
      var header = $("<div />").addClass('header');
      header.html(this.options.header);
      this.selectList.prepend(header);
      this.header = header;
    },

    _disable: function () {
      this.$pluginRoot
        .sortable("option", "disabled", true)
        .selectable("option", "disabled", true);
      this.element
        .addClass("disabled")
        .find(".ui-selected").removeClass('ui-selected');
      this.element.find(".ui-selectee").removeClass("ui-selectee").addClass("ui-disabled");
      $('.buttonColumn', this.content).find("button").attr("disabled", true);
      this._removeDragListeners();
    },

    _enable: function () {
      this.$pluginRoot
        .sortable("option", "disabled", false)
        .selectable("option", "disabled", false);
      this.element.removeClass("disabled");
      this.element.find(".ui-disabled").removeClass("ui-disabled").addClass("ui-selectee");
      $('.buttonColumn', this.content).find("button").attr("disabled", false);
      this._addDragListeners();
    },

    _dumpState: function () {
      var ui = {};
      ui.orderedElements = this.getOrderedElements();
      ui.orderedKeys = this.getOrderedKeys();
      return ui;
    },

    /** Cleanup methods **/

    _removeDomElements: function () {
      $(this.element).find('.ui-selected').removeClass('ui-selected');
      if (this.strategy === 'table') { /* round the table row corners */
        var that = this;
        $(this.element).find("tr").each(function () {
            var $tr = $(this);
            var children = $tr.children();
            children.last().removeClass('last');
            children.first().removeClass('first');
            if (that.options.columnClasses) {
              that._removeColumnClassesFromCells(children, that.options.columnClasses);
            }
          })
      }
      var list = this.element.detach();
      this.selectList.replaceWith(list);
      if (this.options.dragSelect === true) {
        this.content.removeClass('with-handle');
        $(this.element).find('.handle').remove();
      }
      this.element.removeClass('list');
    },

    _removeColumnClasses: function(columnClasses) {
      if (this.strategy !== 'table') {
        return;
      }
      var that = this;
      $(this.element).find('tr').each(function() {
        that._removeColumnClassesFromCells($(this).children(), columnClasses);
      });
    },

    _removeColumnClassesFromCells: function(cells, columnClasses) {
      var columnClasses = columnClasses.split(" ");
      cells.each(function(count) {
        if (count < columnClasses.length) {
          $(this).removeClass(columnClasses[count]);
        } else {
          return false;
        }
      });
    },

    /** Event Handlers **/

    _firstHandler: function (event) {
      this.moveTop($('.ui-selected', this.element), event);
    },

    _upHandler: function (event) {
      this.moveUp($('.ui-selected', this.element), event);
    },

    _downHandler: function (event) {
      this.moveDown($('.ui-selected', this.element), event);
    },

    _lastHandler: function (event) {
      this.moveLast($('.ui-selected', this.element), event);
    }

  });

}(jQuery));