# Testing RichWidgets [![Build Status](https://travis-ci.org/richwidgets/richwidgets.png?branch=master)](https://travis-ci.org/richwidgets/richwidgets) #

> A JavaScript project containing standalone javascript widgets based on Bootstrap, jQuery UI and other third-party widgets, styled with LESS.

## Testing

In the rapid evolving world of Web standards, libraries, and browsers testing is of paramount importance.  We need to make
sure our widgets continue to function as we upgrade the various libraries that make up our project.

RichWidgets uses [jasmine](http://pivotal.github.io/jasmine/) and [jasmine-jquery](https://github.com/velesin/jasmine-jquery),
using [karma](http://karma-runner.github.io/) as our test runner.  Widget tests must go beyond simple setup/takedown of the widgets,
and must also test all widget options and user interactions.  In this way we will be able to keep our widgets both current and stable.

### Installing Karma

*The Karma tool can be easily installed with NPM as:*

    npm install -g karma

### Running Test Suite

*Run all tests on particular browsers:*

    karma start karma.conf.js --browsers=PhantomJS,Chrome,Firefox

### Developing Tests

#### Run test suite continuously reacting on file changes:*

    karma start karma.conf.js --single-run=false --auto-watch=true --browsers=Chrome

#### Running selected tests:

* Open a javascript test source
* Rename the test definition from `it` to `iit`
  * or rename the specification from `describe` to `ddescribe`

#### Debugging tests:

* Write ``debugger;`` anywhere in your test to set a breakpoint.
* Run the test suite with ``--single-run=false --auto-watch=true`` options.
* In a browser window open a console.
* Refresh the browser tab. It should stop the execution on the defined breakpoint.
    
#### Test Configuration

Tests are configured in two files:

* `karma.conf.js` - configuration for Karma runner
* `test/test-main.js` - configuration for Module Loading (AMD)

#### Setting up tests for new module
* Specify files(library sources, dependencies required by tests) to be loaded by Karma HTTP server in `karma.conf.js`
* If a library doesn't provide AMD configuration, create a shim in `test/test-main.js` for the library. If a library
contains more than one file, create a shim for each file. Then create a module that aggregate all library files.

### Running Tests on SauceLabs:

In order to run tests on browsers you don't normally have access to,
or for purposes of continous integration, we leverage Karma - SauceLabs runner.

In order to set it up locally, you have to setup environmental variables:

    export SAUCE_USERNAME=your_username
    export SAUCE_ACCESS_KEY=your_generated_access_key

Then you can start one of browsers:

    karma start --single-run=false --auto-watch=true --browsers=SL_Firefox_latest

Consult `customLaunchers` section in `karma.conf.js` for all the configured browsers.