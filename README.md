# RichWidgets [![Build Status](https://travis-ci.org/richwidgets/richwidgets.png?branch=master)](https://travis-ci.org/richwidgets/richwidgets) #

> A JavaScript project containing standalone javascript widgets based on Bootstrap, jQuery UI and other third-party widgets, styled with LESS.

## Why another widget set?

In the RichWidgets project we are curating a set of OSS responsive javascript widgets.  Existing OSS widgets are leveraged wherever possible,
either consuming them directly as widgets, or by composing them into new widgets.  These widgets are then made available through this project
with a consistent API and Look and Feel - making it easier for you to add rich functionality to your web apps (or web frameworks!).

The current RichWidget architecture is centered around the [jQuery UI widget factory](http://api.jqueryui.com/jQuery.widget/)
with [LESS](http://lesscss.org) & [Bootstrap](http://getbootstrap.com) for styling and theming.  Candidate widgets that
do not use the widget factory will be wrapped with the widget factory to provide a consistent widget API.

## Using the widgets ##

Preview the widgets and see some sample use cases on our demo site: http://richwidgets.github.io.

Compiled assets are currently available in the project's <code>[dist](https://github.com/richwidgets/richwidgets/tree/master/dist)</code> directory.
You can drop them in your project or directly.  Alternatively use the raw LESS and JavaScript files from the
<code>[src](https://github.com/richwidgets/richwidgets/tree/master/src)</code> directory.

## Build from source ##

Along with cloning the project you will need to install the following tools:

- Node and NPM: [instructions](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager), [official website](https://npmjs.org/)
- Grunt: [instructions](http://gruntjs.com/getting-started), [official website](http://gruntjs.com/)
- Bower: [instructions on official website](http://bower.io/)

Once installed, go to the project root and run the following commands:

- <code>npm install</code>
- <code>grunt bower</code>
- <code>grunt</code>

This should drop a bunch of logs in your shell and use up some bandwith. Once it's completed, you will have built the
richwidgets `dist` folder which contains both `demos` of the widgets, as well as all the compiled widgets' `assets`.

## Run the demo ##

Now that widgets and demo have been built with the `grunt` command, you can view the widgets by either:

1. Navigating your browser to the `dist/demo` folder
2. Run the command `grunt connect:demo:keepalive` and navigate your browser to http://localhost:9000/

<div class="alert alert-info">
<strong>Remember!</strong> The demos are also available <span class=".alert-link">[online](http://richwidgets.github.io).</span>
</div>

## Feedback ##

Have a problem with one of our widgets?  Is there a particular widget you'd like to see incorporated in the project?
File an issue in our [issue tracker](https://github.com/richwidgets/richwidgets/issues).

## Contributors ##

RichWidgets is very much an open source project, your contributions are valued!  Learn how to get involved with the project
in our [CONTRIBUTING.md](https://github.com/richwidgets/richwidgets/blob/master/CONTRIBUTING.md) guide.

Read about our approach to testing in the [TESTS.md](https://github.com/richwidgets/richwidgets/blob/master/TESTS.md) guide.

## License ##

[Apache License Version 2.0](https://github.com/richwidgets/richwidgets/blob/master/LICENSE.txt).
