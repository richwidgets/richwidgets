(function ($) {

    $.widget('rf.autocompleteBridge', {

        options: {
            token: "",
            showButton: false
        },

        _create: function() {
          this.input = this.element;
          this.disabled = this.input.disabled;
          this.root = this._initDom();

          if (!this.options.layout) {
            this._setOption('layout', 'list');
          }

          this._enhanceAutocomplete();
          this._registerListeners();
        },

        _destroy: function() {
          this.input.autocomplete('destroy');
          this._destroyDom();
        },

        _enable: function() {
          this.input.autocomplete('enable');
        },

        _disable: function() {
          this.input.autocomplete('disable');
        },

        _initDom: function() {
          this.root = $($('<div class="r-autocomplete"></div>').insertBefore(this.input)[0]);
          this.root.append(this.input.detach());

          if (this.options.showButton) {
            var that = this;

            this.root.addClass("input-group");
            this.button = $('<span class="input-group-addon"><i class="icon-chevron-down"></i></span>').appendTo(this.root);

            this.button.click(function() {
              $(that.element).autocomplete("search");
              setTimeout(function() {


                $("body").one("click", function() {
                  setTimeout(function() {
                    $(that.element).autocomplete("close");
                  }, 0);
                });
              }, 0);
            });
          }

          if (this.options.choices) {
            var choices = $(this.options.choices);
            this._setOption('choices', choices);
          }

          return this.root;
        },

        _destroyDom: function() {
          this.input.detach().insertAfter(this.root);
          this.root.remove();
        },

        _enhanceAutocomplete: function() {
            var options = this._getBasicAutocompleteOptions();

            if (this.options.token) {
                options = $.extend(options, this._getTokenizingAutocompleteOptions());
                this._preventTabbing();
            }

            this.input.autocomplete(options);
        },

        _getBasicAutocompleteOptions: function() {
            return {
                delay: 0,
                minLength: 0,
                source: this.options.suggestions || []
            };
        },

        _getTokenizingAutocompleteOptions: function() {
            var bridge = this;

            var split = function( val ) {
                var regexp = new RegExp("\\s*" + bridge.options.token + "\\s*");
                return val.split( regexp );
            };

            var extractLast = function( term ) {
                return split( term ).pop();
            };

            return {
                source: function( request, response ) {
                    // delegate back to autocomplete, but extract the last term
                    response( $.ui.autocomplete.filter(
                        bridge.options.suggestions, extractLast( request.term ) ) );
                },
                focus: function() { return false; },
                select: function( event, ui ) {
                    var terms = split( this.value );
                    // remove the current input
                    terms.pop();
                    // add the selected item
                    terms.push( ui.item.value );
                    // add placeholder to get the comma-and-space at the end
                    terms.push( "" );
                    this.value = terms.join( bridge.options.token + " " );
                    return false;
                }
            }
        },

        _preventTabbing: function() {
            this.element.bind( "keydown", function( event ) {
                if ( event.keyCode === $.ui.keyCode.TAB &&
                    $( this ).data( "autocomplete" ).menu.active ) {
                    event.preventDefault();
                }
            });
        },

        _registerListeners: function() {
            this.input.bind("autocompletesearch", this.options.onsearch);
            this.input.bind("autocompleteopen", this.options.onopen);
            this.input.bind("autocompletefocus", this.options.onfocus);
            this.input.bind("autocompleteselect", this.options.onselect);
            this.input.bind("autocompleteclose", this.options.onclose);
            this.input.bind("autocompletechange", this.options.onchange);
        },

        _setLayout: function(layout) {
          var data = this.input.autocomplete().data('ui-autocomplete');
          switch(layout) {
            case 'list' :
              data._renderMenu = $.ui.autocomplete.prototype._renderMenu;
              data._renderItem = function( ul, item ) {
                var content = item.html ? $("<a>").html(item.html) : $("<a>").text(item.label);
                return $("<li>").append(content).appendTo( ul );
              };
              break;
            case 'table' :
              this._setOption("appendTo", $("<div class='ui-autocomplete-layout-table-wrapper'>").appendTo($("body")));
              data._renderMenu = function( ul, items ) {
                ul.addClass('ui-autocomplete-layout-table');
                return $.ui.autocomplete.prototype._renderMenu.call(this, ul, items);
              };
              data._renderItem = function (ul, item) {
                var link = $("<a>");
                item.html.find("> td").each(function() {
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

        _setChoices: function(value) {
          var suggestions = [];
          var choices = this.choices = $(value);
          var layout = 'list';

          if (choices.is('table')) {
            layout = 'table';
            choices =  choices.children('tbody');
          }
          $(choices).children('tr, li').each(function() {
            suggestions.push({
              value: $(this).data("label") || $(this).text(),
              html: $(this).clone()
            })
          });

          this._setOption('suggestions', suggestions);
          this._setOption('layout', layout);
        },

        _setOption: function(key, value) {
            if (key === 'choices') {
              this._setChoices(value);
              return;
            }
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
            this._super( key, value );
        }
    });

}(jQuery));