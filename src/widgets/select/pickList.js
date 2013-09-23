(function ($) {

  $.widget('rf.pickList', {

    options: {
      disabled: false,
      header: ''
    },

    _create: function () {
      this.widgetEventPrefix = "picklist_";
      this.sourceList = this.element.find(".source");
      this.targetList = this.element.find(".target");
      this._addDomElements();
      this.sourceList.orderingList({
        showButtons: false,
        contained: false,
        widgetEventPrefix: 'sourcelist_'
      });
      this.targetList.orderingList({
        contained: false,
        widgetEventPrefix: 'targetlist_'
      });
      this.sourceList.orderingList("connectWith", this.targetList);
      this.targetList.orderingList("connectWith", this.sourceList);

      this._registerListeners();
    },

    destroy: function () {
      $.Widget.prototype.destroy.call(this);
      this._removeDomElements();
      this.sourceList.orderingList("destroy");
      this.targetList.orderingList("destroy");
      return this;
    },

    /** Public API methods **/

    moveLeft: function (items, event) {
      if (this.options.disabled) return;
      this.targetList.orderingList("remove", items);
      this.sourceList.orderingList("add", items);
      var ui = this._dumpState();
      ui.change = 'remove';
      this._trigger("change", event, ui);
    },

    moveRight: function (items, event) {
      if (this.options.disabled) return;
      this.sourceList.orderingList("remove", items);
      this.targetList.orderingList("add", items);
      var ui = this._dumpState();
      ui.change = 'add';
      this._trigger("change", event, ui);
    },


    /** Initialisation methods **/

    _addDomElements: function () {
      this._addParents();
      var buttonColumn = $('<div />').addClass('middle buttonColumn col-sm-1');
      buttonColumn.append(this._buttonStack());
      this.sourceList.parent().after(buttonColumn);
    },

    _buttonStack: function () {
      var button = $('<button type="button" class="btn btn-default"/>');
      var buttonStack = $("<div/>")
        .addClass("btn-group-picklist row");
      buttonStack
        .append(
          button.clone()
            .addClass('btn-left-all col-sm-12 col-xs-3')
            .html('<i class="icon icon-left-all" />')
            .bind('click.orderingList', $.proxy(this._leftAllHandler, this))
        )
        .append(
          button.clone()
            .addClass('btn-left col-sm-12 col-xs-3')
            .html('<i class="icon icon-left" />')
            .bind('click.orderingList', $.proxy(this._leftHandler, this))
        )
        .append(
          button.clone()
            .addClass('btn-right col-sm-12 col-xs-3')
            .html('<i class="icon icon-right" />')
            .bind('click.orderingList', $.proxy(this._rightHandler, this))
        )
        .append(
          button
            .clone()
            .addClass('btn-right-all col-sm-12 col-xs-3')
            .html('<i class="icon icon-right-all" />')
            .bind('click.orderingList', $.proxy(this._rightAllHandler, this))
        );
      return buttonStack;
    },

    _addParents: function () {
      this.element.addClass("row").wrap(
        $("<div />").addClass('pick-list outer')
      );
      this.outer = this.element.parents(".outer").first();
      if (this.options.header) {
        this.outer.prepend(
          $("<div />").addClass("row").append(
            $("<div />").addClass('col-xs-12 header').append(
              $("<h3/>").html(this.options.header)
            )
          )
        );
      }
      this.sourceList.wrap(
        $("<div />").addClass('left col-sm-5')
      )
      this.targetList.wrap(
        $("<div />").addClass('right col-sm-6')
      )
      this.content = this.element;

    },

    _registerListeners: function () {
      var self = this;
      // the widget factory converts all events to lower case
      this.sourceList.bind('sourcelist_receive', function (event, ui) {
        var new_ui = self._dumpState();
        new_ui.change = 'remove';
        new_ui.originalEvent = event;
        self._trigger("change", event, new_ui);
      });
      this.targetList.bind('targetlist_receive', function (event, ui) {
        var new_ui = self._dumpState();
        new_ui.change = 'add';
        new_ui.originalEvent = event;
        self._trigger("change", event, new_ui);
      });
      this.targetList.bind('targetlist_change', function (event, ui) {
        var new_ui = self._dumpState();
        new_ui.change = 'sort';
        new_ui.originalEvent = event;
        self._trigger("change", event, new_ui);
      });
      // Bind the client-provided change listeners
      if (this.options.onchange && typeof this.options.onchange == 'function') {
        this.component.bind('change.pickList.bootstrap.RICH', this.options.onchange);
      }
    },

    _dumpState: function () {
      var ui = {};
      ui.pickedElements = this.targetList.orderingList("getOrderedElements");
      ui.pickedKeys = this.targetList.orderingList("getOrderedKeys");
      return ui;
    },

    /** Cleanup methods **/

    _removeDomElements: function () {
      var list = this.element.detach();
      this.outer.replaceWith(list);
      this.element.removeClass("row");
      this.sourceList.parents('.left').first().replaceWith(this.sourceList.detach());
      this.targetList.parents('.right').first().replaceWith(this.targetList.detach());
    },

    /** Event Handlers **/

    _leftAllHandler: function (event) {
      var items = $('.ui-selectee', this.targetList);
      this.moveLeft(items, event);
      this.sourceList.orderingList('selectItem', items);
    },

    _leftHandler: function (event) {
      this.moveLeft($('.ui-selected', this.targetList), event);
    },

    _rightHandler: function (event) {
      this.moveRight($('.ui-selected', this.sourceList), event);
    },

    _rightAllHandler: function (event) {
      var items = $('.ui-selectee', this.sourceList);
      this.moveRight(items, event);
      this.targetList.orderingList('selectItem', items);
    }

  });

}(jQuery));