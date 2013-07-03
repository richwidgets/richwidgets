(function ($) {
    
    $.widget('rf.autocompleteBridge', {
        
        options: {
            token: "",
            showButton: true
        },
        
        _create: function() {
          this.input = this.element;
          this.disabled = this.input.disabled;
          this.root = this._initializeDom();

          if (!this.options.layout) {
            this._setOption('layout', 'list');
          }

          this._enhanceAutocomplete();
          this._registerListeners();
        },

        _initializeDom: function() {
          var root = $($('<div class="rf-au"></div>').insertBefore(this.input)[0]);
          root.append(this.input.detach());

          if (this.options.showButton) {
            root.addClass("input-group");
            this.button = $('<span class="input-group-addon"><i class="icon-chevron-down"></i></span>').appendTo(root);
          }

          if (this.options.choices) {
            this._setOption('choices', $(this.options.choices).detach());
          }

          return root;
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
            
            var split = function split( val ) {
                var regexp = new RegExp("\\s*" + bridge.options.token + "\\s*"); 
                return val.split( regexp );
            };
            
            var extractLast = function extractLast( term ) {
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
          var that = this;
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
          var value = $(value);
          var layout = 'list';

          if (value.is('table')) {
            layout = 'table';
            value =  value.children('tbody');
          }
          $(value).children('tr, li').each(function() {
            suggestions.push({
              value: $(this).data("label") || $(this).text(),
              html: $(this)
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
            this._super( key, value );
        }
    });
    
}(jQuery));