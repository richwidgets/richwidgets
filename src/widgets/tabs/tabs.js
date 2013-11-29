/**
 * Tab widget based on $.ui.tabs and styled with Bootstrap
 *
 * @module Tabs
 * @class tabs
 * @uses $.ui.tabs
 */
(function ($) {

  var rhash = /#.*$/;

  function isLocal( anchor ) {
  return anchor.hash.length > 1 &&
    anchor.href.replace( rhash, '' ) ===
      location.href.replace( rhash, '' )
        // support: Safari 5.1
        // Safari 5.1 doesn't encode spaces in window.location
        // but it does encode spaces from anchors (#8777)
        .replace( /\s/g, '%20' );
  }

  $.widget('rich.tabs', $.ui.tabs, {

    options: {
      position: 'top'
    },

    _create: function() {
      this.element.addClass('rich-tabs rich-tabs-' + this.options.position);

      this._super();

      if (this.options.position === 'bottom') {
        this.tablist.appendTo(this.element);
      }
    },

    _processTabs: function() {
      var that = this;

      this.tablist = this._getList()
        .addClass( 'nav nav-tabs' )
        .attr( 'role', 'tablist' );

      this.tabs = this.tablist.find( '> li:has(a[href]):not(li:has(li)), > li li:has(a[href])' )
        .addClass( 'ui-state-default ui-corner-top' )
        .attr({
          role: 'tab',
          tabIndex: -1
        });

      //dropdowns
      this.dropdowns = this.tablist.find('li:has(li) > a')
        .addClass('dropdown-toggle')
        .attr('data-toggle','dropdown');

      this.dropdowns.map(function() {
          var $this = $(this);

          $this.html($this.html() + ' <b class=\"caret\"></b>')
        });

      this.dropdowns.find('+ ul, + ol')
        .addClass('dropdown-menu');


      this.anchors = this.tabs.map(function() {
          return $( 'a', this )[ 0 ];
        })
        .addClass( 'ui-tabs-anchor' ) // needs to stay for the switching to work
        .attr({
          role: 'presentation',
          tabIndex: -1
        });

      this.panels = $();

      this.anchors.each(function( i, anchor ) {
        var selector, panel, panelId,
          anchorId = $( anchor ).uniqueId().attr( 'id' ),
          tab = $( anchor ).closest( 'li' ),
          originalAriaControls = tab.attr( 'aria-controls' );

        // inline tab
        if ( isLocal( anchor ) ) {
          selector = anchor.hash;
          panel = that.element.find( that._sanitizeSelector( selector ) );
        // remote tab
        } else {
          panelId = that._tabId( tab );
          selector = '#' + panelId;
          panel = that.element.find( selector );
          if ( !panel.length ) {
            panel = that._createPanel( panelId );
            panel.insertAfter( that.panels[ i - 1 ] || that.tablist );
          }
          panel.attr( 'aria-live', 'polite');
        }

        if ( panel.length) {
          that.panels = that.panels.add( panel );
        }
        if ( originalAriaControls ) {
          tab.data( 'ui-tabs-aria-controls', originalAriaControls );
        }
        tab.attr({
          'aria-controls': selector.substring( 1 ),
          'aria-labelledby': anchorId
        });
        panel.attr( 'aria-labelledby', anchorId );
      });

      this.panels
        .addClass( 'ui-tabs-panel ui-widget-content ui-corner-bottom' )
        .attr( 'role', 'tabpanel' );
    },

    _toggle: function( event, eventData ) {
      var that = this,
        toShow = eventData.newPanel,
        toHide = eventData.oldPanel;

      this.running = true;

      function complete() {
        that.running = false;
        that._trigger( 'activate', event, eventData );
      }

      function show() {
        eventData.newTab.closest( 'li' ).addClass( 'ui-tabs-active active' );

        if ( toShow.length && that.options.show ) {
          that._show( toShow, that.options.show, complete );
        } else {
          toShow.show();
          complete();
        }
      }

      // start out by hiding, then showing, then completing
      if ( toHide.length && this.options.hide ) {
        this._hide( toHide, this.options.hide, function() {
          eventData.oldTab.closest( 'li' ).removeClass( 'ui-tabs-active active' );
          show();
        });
      } else {
        eventData.oldTab.closest( 'li' ).removeClass( 'ui-tabs-active active' );
        toHide.hide();
        show();
      }

      toHide.attr({
        'aria-expanded': 'false',
        'aria-hidden': 'true'
      });
      eventData.oldTab.attr( 'aria-selected', 'false' );
      // If we're switching tabs, remove the old tab from the tab order.
      // If we're opening from collapsed state, remove the previous tab from the tab order.
      // If we're collapsing, then keep the collapsing tab in the tab order.
      if ( toShow.length && toHide.length ) {
        eventData.oldTab.attr( 'tabIndex', -1 );
      } else if ( toShow.length ) {
        this.tabs.filter(function() {
          return $( this ).attr( 'tabIndex' ) === 0;
        })
        .attr( 'tabIndex', -1 );
      }

      toShow.attr({
        'aria-expanded': 'true',
        'aria-hidden': 'false'
      });
      eventData.newTab.attr({
        'aria-selected': 'true',
        tabIndex: 0
      });
    },

    _refresh: function() {
      this._setupDisabled( this.options.disabled );
      this._setupEvents( this.options.event );
      this._setupHeightStyle( this.options.heightStyle );

      this.tabs.not( this.active ).attr({
        'aria-selected': 'false',
        tabIndex: -1
      });
      this.panels.not( this._getPanelForTab( this.active ) )
        .hide()
        .attr({
          'aria-expanded': 'false',
          'aria-hidden': 'true'
        });

      // Make sure one tab is in the tab order
      if ( !this.active.length ) {
        this.tabs.eq( 0 ).attr( 'tabIndex', 0 );
      } else {
        this.active
          .addClass( 'ui-tabs-active active' )
          .attr({
            'aria-selected': 'true',
            tabIndex: 0
          });
        this._getPanelForTab( this.active )
          .show()
          .attr({
            'aria-expanded': 'true',
            'aria-hidden': 'false'
          });
      }
    },

    _destroy: function() {
      if (this.options.position === 'bottom') {
        this.tablist.prependTo(this.element);
      }

      this._super();

      this.element.removeClass('rich-tabs rich-tabs-' + this.options.position);
      this.tablist.removeClass('nav nav-tabs');
      this.tabs.removeClass('active');
    }

  });

}(jQuery));