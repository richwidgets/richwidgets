# Contributing to RichWidgets [![Build Status](https://travis-ci.org/richwidgets/richwidgets.png?branch=master)](https://travis-ci.org/richwidgets/richwidgets) #

> A JavaScript project containing standalone javascript widgets based on Bootstrap, jQuery UI and other third-party widgets, styled with LESS.

## Hacking on RichWidgets

Widgets are highly visual constructs, and we are more effective in developing them when we get rapid feedback as we introduce changes.
Without this rapid feedback, we are like sculptors carving blindfolded!

Run the `grunt dev` command from the richwidgets root folder to start up a development version of the online demo with
integrated [live-reload](https://github.com/livereload/livereload-js).  As you make changes to the html, javascript, and LESS
source, the source will be compiled and the demo site will be updated.

Additionally, this development version of the demo also uses unminified versions of the sources making it easier to debug your widget
in your browsers development tools.

The demo pages themselves use [handlebars.js](http://handlebarsjs.com/) for templating.  This allows us to keep our demo
code [DRY](http://en.wikipedia.org/wiki/Don%27t_Repeat_Yourself) by using the same code to both run the page sample as well as display
the code on the page.  Handlebars is easily extensible through it's [helper](http://assemble.io/docs/Custom-Helpers.html)
mechanism.  If you find yourself bending over backwards to make something work, consider writing such a helper.

## Testing

In the rapid evolving world of Web standards, libraries, and browsers testing is of paramount importance.  We need to make
sure our widgets continue to function as we upgrade the various libraries that make up our project.

RichWidgets uses [jasmine](http://pivotal.github.io/jasmine/) and [jasmine-jquery)(https://github.com/velesin/jasmine-jquery),
using [karma](http://karma-runner.github.io/) as our test runner.  Widget tests must go beyond simple setup/takedown of the widgets,
and must also test all widget options and user interactions.  In this way we will be able to keep our widgets both current and stable.

### Running Test Suite

*Run all tests on particular browsers:*

    karma start karma.conf.js -browsers=PhantomJS,Chrome,Firefox

### Developing Tests

*Run test suite continuously reacting on file changes:*

    karma start karma.conf.js --single-run=false --auto-watch=true --browsers=Chrome

*Running selected tests:*

* Open a javascript test source
* Rename the test definition from `it` to `iit`
  * or rename the specification from `describe` to `ddescribe`

### Test Configuration

Tests are configured in two files:

* `karma.conf.js` - configuration for Karma runner
* `test/test-main.js` - configuration for Module Loading (AMD)