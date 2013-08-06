(function ($) {

  var LAYOUT = {
    list: 0,
    table: 1
  };

  $.ui.richAutocomplete = {};

  $.extend($.ui.richAutocomplete, {
    objectCache: function () {
      var cache = {};
      return {
        get: function (term) {
          return cache[term];
        },
        put: function (term, value) {
          cache[term] = value;
        }
      }
    }
  });

  $.widget('rf.richAutocomplete', {

    LAYOUT: LAYOUT,

    options: {
      token: "",
      showButton: false,
      /**
       * Source can be either array or function (compatible with jQuery UI Autocomplete),
       * or it can be DOM element reference or string (CSS Selector).
       */
      source: [],
      layout: LAYOUT.list,
      cached: false,
      cacheImplemenation: $.ui.richAutocomplete.objectCache,

      /**
       * Function called when search triggered but before suggestions are composed.
       *
       * It gives chance to update source of suggestions as reflection to current search term.
       *
       * function({ term: currentSearchTerm }, doneCallback)
       *
       * when doneCallback is specified, autocomplete will wait with update of suggestions before doneCallback
       * is called. Usually it is called on the end of AJAX data update.
       */
      update: null,

      // TODO should not be option, but private member
      suggestions: []
    },

    _create: function () {
      this.input = this.element;
      this.disabled = this.input.disabled;

      // initialize DOM structure
      this.root = this._initDom();

      if (this.options.cached) {
        this.cache = new this.options.cacheImplemenation();
      }

      if (!this.options.layout) {
        this._setOption('layout', this.LAYOUT.list);
      }

      var autocompleteOptions = this._getAutocompleteOptions();
      this.input.autocomplete(autocompleteOptions);

      this._registerListeners();

      if (this.options.source) {
        this._setOption('source', this.options.source);
      }
    },

    _destroy: function () {
      this.input.autocomplete('destroy');
      this._destroyDom();
    },

    _enable: function () {
      this.input.autocomplete('enable');
    },

    _disable: function () {
      this.input.autocomplete('disable');
    },

    _initDom: function () {
      this.root = $($('<div class="r-autocomplete"></div>').insertBefore(this.input)[0]);
      this.root.append(this.input.detach());

      if (this.options.showButton) {
        var that = this;

        this.root.addClass("input-group");
        this.button = $('<span class="input-group-addon"><i class="icon-chevron-down"></i></span>').appendTo(this.root);

        this.button.click(function () {
          $(that.element).autocomplete("search");
          setTimeout(function () {

            $("body").one("click", function () {
              setTimeout(function () {
                $(that.element).autocomplete("close");
              }, 0);
            });
          }, 0);
        });
      }

      return this.root;
    },

    _destroyDom: function () {
      this.input.detach().insertAfter(this.root);
      this.root.remove();
    },

    _getAutocompleteOptions: function () {
      var widget = this;

      return {
        delay: 0,
        minLength: 0,
        source: function (request, response) {
          widget._getSuggestions(request, response);
        },
        focus: function () {
          return false;
        },
        select: function (event, ui) {
          this.value = widget._selectValue(event, ui, this.value);
          return false;
        }
      };
    },

    _splitTokens: function (val) {
      var regexp = new RegExp("\\s*" + this.options.token + "\\s*");
      return val.split(regexp);
    },


    _extractLastToken: function (term) {
      return this._splitTokens(term).pop();
    },

    _extractSearchTerm: function (request) {
      if (this.options.token) {
        return this._extractLastToken(request.term);
      } else {
        return request.term;
      }
    },

    _selectValue: function (event, ui, value) {
      if (this.options.token) {
        var terms = this._splitTokens(value);
        // remove the current input
        terms.pop();
        // add the selected item
        terms.push(ui.item.value);
        // add placeholder to get the comma-and-space at the end
        terms.push("");
        return terms.join(this.options.token + " ");
      } else {
        return ui.item.value;
      }
    },

    _getSuggestions: function (request, response) {
      var searchTerm = this._extractSearchTerm(request);

      var req = $.extend({}, request, {
        term: searchTerm
      });

      var resp = $.proxy(function () {
        if (this.cache) {
          this.cache.put(searchTerm, arguments);
        }
        return response.apply(window, arguments);
      }, this);

      if (this.cache) {
        var result = this.cache.get(searchTerm);
        if (result) {
          response.apply(window, result);
          return;
        }
      }

      this._retrieveSuggestions(req, resp);
    },

    _retrieveSuggestions: function (request, response) {
      var source = this.options.source;

      if (this._isDomBasedSource(source)) {
        // DOM-based
        this._suggestFromDom(request, response);
      } else if ($.isFunction(source)) {
        // function-based
        source(request, response);
      } else {
        // array-based
        response($.ui.autocomplete.filter(source, request.term));
      }
    },

    _suggestFromDom: function(request, response) {
      var updateFn = this.options.update;

      var updateSuggestionsAndRespond = $.proxy(function () {
        this._updateDomSuggestions();
        response(this.options.suggestions);
      }, this);

      if ($.isFunction(updateFn)) {
        // has the function second parameter? (which is 'done' callback)
        if (updateFn.length >= 2) {
          updateFn.call(window, request, updateSuggestionsAndRespond);
        } else {
          updateFn.call(window, request);
          updateSuggestionsAndRespond();
        }
      } else {
        response(this.options.suggestions);
      }
    },

    _updateDomSuggestions: function () {
      var suggestions = [];
      var domSource = $(this.options.source);
      var layout = LAYOUT.list;

      if (domSource.is('table')) {
        layout = LAYOUT.table;
        domSource = domSource.children('tbody');
      }
      $(domSource).children('tr, li').each(function () {
        suggestions.push({
          value: $(this).data("label") || $(this).text(),
          html: $(this).clone()
        })
      });

      if (this.option('layout') !== layout) {
        this._setOption('layout', layout);
      }

      this._setOption('suggestions', suggestions);
    },

    _preventTabbing: function () {
      this.element.bind("keydown", function (event) {
        if (event.keyCode === $.ui.keyCode.TAB &&
          $(this).data("autocomplete").menu.active) {
          event.preventDefault();
        }
      });
    },

    _registerListeners: function () {
      this.input.bind("autocompletesearch", this.options.onsearch);
      this.input.bind("autocompleteopen", this.options.onopen);
      this.input.bind("autocompletefocus", this.options.onfocus);
      this.input.bind("autocompleteselect", this.options.onselect);
      this.input.bind("autocompleteclose", this.options.onclose);
      this.input.bind("autocompletechange", this.options.onchange);
    },

    _setLayout: function (layout) {
      var data = this.input.autocomplete().data('ui-autocomplete');
      switch (layout) {
        case this.LAYOUT.list :
          data._renderMenu = $.ui.autocomplete.prototype._renderMenu;
          data._renderItem = function (ul, item) {
            var content = item.html ? $("<a>").html(item.html) : $("<a>").text(item.label);
            return $("<li>").append(content).appendTo(ul);
          };
          break;
        case this.LAYOUT.table :
          this._setOption("appendTo", $("<div class='ui-autocomplete-layout-table-wrapper'>").appendTo($("body")));
          data._renderMenu = function (ul, items) {
            ul.addClass('ui-autocomplete-layout-table');
            return $.ui.autocomplete.prototype._renderMenu.call(this, ul, items);
          };
          data._renderItem = function (ul, item) {
            var link = $("<a>");
            item.html.find("> td").each(function () {
              $('<span>').html($(this).html()).appendTo(link)
            })
            return $("<li></li>")
              .data("item.autocomplete", item)
              .append(link)
              .appendTo(ul);
          };
          break;
      }
    },

    _setOption: function (key, value) {
      if (key === 'layout') {
        this._setLayout(value);
      }
      if (key === 'disabled') {
        if (value) {
          this._disable();
        } else {
          this._enable();
        }
      }

      this._super(key, value);

      if (key === 'source') {
        if (this._isDomBasedSource(value)) {
          this._updateDomSuggestions();
        }
      }
    },

    _isDomBasedSource: function(value) {
      return value instanceof HTMLElement || $.type(value) == 'string';
    }
  });

}(jQuery));