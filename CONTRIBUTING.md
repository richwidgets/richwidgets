# Contributing to RichWidgets [![Build Status](https://travis-ci.org/richwidgets/richwidgets.png?branch=master)](https://travis-ci.org/richwidgets/richwidgets) #

> A JavaScript project containing standalone javascript widgets based on Bootstrap, jQuery UI and other third-party widgets, styled with LESS.

## Hacking on RichWidgets

Begin by setting you your environment and making sure you can build RichWidgets as described the
[README.md](https://github.com/richwidgets/richwidgets/blob/master/README.md#build).

Widgets are highly visual constructs, and we are more effective in developing them when we get rapid feedback as we introduce changes.
Without this rapid feedback, we are like sculptors carving blindfolded!

Run the `grunt dev` command from the richwidgets root folder to start up a development version of the online demo with
integrated [live-reload](https://github.com/livereload/livereload-js).  You will see this demo runnin locally at:

> http://localhost:9000

As you make changes to the html, javascript, and LESS
source, the source will be compiled and the demo site will be updated.

Additionally, this development version of the demo uses unminified versions of the sources making it easier to debug your widget
in your browsers development tools.

The demo pages themselves use [handlebars.js](http://handlebarsjs.com/) for templating.  This allows us to keep our demo
code [DRY](http://en.wikipedia.org/wiki/Don%27t_Repeat_Yourself) by using the same code to both run the page sample as well as display
the code on the page.  Handlebars is easily extensible through it's [helper](http://assemble.io/docs/Custom-Helpers.html)
mechanism.  If you find yourself bending over backwards to make something work, consider writing such a helper.

## Publishing the demos

Publish the demos to github pages using the grunt task `grunt site`

## Coding Style

It helps to be consistent.  Here are the coding style conventions we have agreed to follow in this project.  this will be
updated as new discrepancies are discovered and cleaned up.  Wherever possible these conventions are being monitored by
jshint.

* Indentation
    * Use spaces (not tabs)
    * Indentation size is 2 spaces
* Filenames
    * All filenames will use a lowercase-hyphenated naming convention (e.g. `popup-panel.js`)
* LESS
  * CSS class names use lowercase-hyphenated naming convention (e.g. `popup-panel`)
  * Define variables centrally in `src/widgets/variables.less`
  * Define mixins centrally in `src/widgets/mixins.less`
* JavaScript
  * Functions and variables names use camelCase (e.g. `popupPanelWidth`, `showPopup()`)
  * Single quotes `'` for strings
  * do not use `self` for capturing a reference to `this`
      * use `widget` where it makes sense to do so, `that` otherwise
  * function white-spaces
      * named functions
          * `function name(param1, param2) {}`
      * unnamed functions
          * `function (param1, param2) {}`
* Widget Factory
  * Use the `rich` jquery plugin namespace
  * No widget name prefix when it is not required
    * i.e. when we extend upstream plugin's functionality, we make sure the API is compatible (e.g. `rich.autocomplete` extending `ui.autocomplete`)
  * Widget event prefix: stick with the default name of the widget (eg. no underscores or abbreviating)
  * Initialize all options, using `null` as default value is required
  * Widget state should be collected for use in _trigger invocations using a method called `_uiHash`
  * order of methods inside widget definition
    1. lifecycle methods (e.g. `_create()`, `_destroy()`)
    1. public API methods (e.g. `showPopup()`)
    1. private methods
      1. initialization methods (e.g. `_setOption()`, `_initDom()`, `_bindListeners()`)
      1. cleanup methods (E.g. `_cleanDom()`)
      1. common utility methods (e.g. `_enable()`, `_disable()`, `_uiHash()`)
      1. event handlers
      1. other private methods (E.g. `_uiHash()`)

## Creating a new widget

To create a new widget called "My widget", start by creating the files:

* `src/widget/<widget-family>/my-widget.less`
* `src/widget/<widget-family>/my-widget.js`

Create a demo for your widget in

* `src/demo/pages/<widget-family/my-widget.hbs`

The demo pages use [handlebars.js](http://handlebarsjs.com/), and will be added to the site navigation automatically.

## Testing

Read about our approach to testing in the [TESTS.md](https://github.com/richwidgets/richwidgets/blob/master/TESTS.md) guide.
