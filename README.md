# RichWidgets [![Build Status](https://travis-ci.org/richwidgets/richwidgets.png?branch=master)](https://travis-ci.org/richwidgets/richwidgets) [![devDependency Status](https://david-dm.org/richwidgets/richwidgets/dev-status.png)](https://david-dm.org/richwidgets/richwidgets#info=devDependencies) #

> A JavaScript project containing standalone javascript widgets based on Bootstrap, jQuery UI and other third-party widgets, styled with LESS.

## Why another widget set?

In the RichWidgets project we are curating a set of OSS responsive javascript widgets.  Existing OSS widgets are leveraged wherever possible,
either consuming them directly as widgets, or by composing them into new widgets.  These widgets are then made available through this project
with a consistent API and Look and Feel - making it easier for you to add rich functionality to your web apps (or web frameworks!).

The current RichWidget architecture is centered around the [jQuery UI widget factory](http://api.jqueryui.com/jQuery.widget/)
with [LESS](http://lesscss.org) & [Bootstrap](http://getbootstrap.com) for styling and theming.  Candidate widgets that
do not use the widget factory will be wrapped with the widget factory to provide a consistent widget API.

<a name='using'></a>
## Using the widgets ##

Preview the widgets and see some sample use cases on our demo site: http://richwidgets.io.

To consume Richwidgets in your application/framework, you will currently have to [build](#build) the widget assets.

(Note: In the time-frame of our 0.1 release we will [provide RichWidgets](https://github.com/richwidgets/richwidgets/issues/78) as a Bower package.)

### Executing a RichWidget

RichWidgets are jQuery plugins (built using the jQuery UI Widget Factory).
Executing a plugin to include the widget's functionality is as simple as:

```javascript
$('#myDiv').widgetName(options);
```

For a list of available widgets and their associated options check out the [API Docs](http://www.richwidgets.io/api/).

### Invoking public methods

A widget's public methods are available through the [jQuery UI Widget factory](http://api.jqueryui.com/jQuery.widget/) API.
Accessing a public API method in this way looks like:

```javascript
$('#myDiv').widgetName('methodName', param1, parma2, ....);
```

Accessing private methods is discouraged, but can be done so as follows:

````javascript
var widget = $('myDiv').data('widgetName');
widget._privateMethod(params);
````

Acessing private methods can be handy for testing purposes, or for extending a widget.
However the private method API has not contract of stability.
If you find yourself needing to access a private method consider [filing an issue](https://github.com/richwidgets/richwidgets/issues)
requesting that the functionality be exposed via a public method.

### Mutating widget options

The options used to initialize a widget via the `options` parameter can be mutated using the `option` public API method of the jQuery UI widget factory:

```javascript
$('#myDiv').widgetName('option', 'optionName', param1, parma2, ....);
```

### Cleanup

All widgets support the `destroy` method.  Invoking this method will remove the widget and restore your DOM to it's initial state:

```javascript
$('#myDiv').widgetName('destroy');
```

<a name='build'></a>
## Build from source ##

Along with cloning the project you will need to install the following tools:

- Node and NPM: [instructions](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager), [official website](https://npmjs.org/)
  - recommended version: Node 0.10.22
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
<strong>Remember!</strong> The demos are also available <span class=".alert-link">[online](http://richwidgets.io).</span>
</div>

<a name='issues'></a>
## Reporting Bugs ##
Have a problem with one of our widgets?  Is there a particular widget you'd like to see incorporated in the project?
File an issue in our [issue tracker](https://github.com/richwidgets/richwidgets/issues).

<a name='contributing'></a>
## Contributors ##

RichWidgets is very much an open source project, your contributions are valued!  Learn how to get involved with the project
in our [CONTRIBUTING.md](https://github.com/richwidgets/richwidgets/blob/master/CONTRIBUTING.md) guide.

Read about our approach to testing in the [TESTS.md](https://github.com/richwidgets/richwidgets/blob/master/TESTS.md) guide.

<a name='license'></a>
## License ##

[Apache License Version 2.0](https://github.com/richwidgets/richwidgets/blob/master/LICENSE.txt).
