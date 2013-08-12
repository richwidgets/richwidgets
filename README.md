# RichFaces Widgets [![Build Status](https://travis-ci.org/richwidgets/richwidgets.png?branch=master)](https://travis-ci.org/richwidgets/richwidgets) #

> A JavaScript project containing the standalone javascript widgets used by the RichFaces project.

## Users ##

Depending on your needs, you can grab the compiled files inside the <code>[dist](https://github.com/richfaces/richfaces-widgets/tree/master/dist)</code> directory and drop them on your
project or directly use the LESS and raw JavaScript files from the <code>[src](https://github.com/richfaces/richfaces-widgets/tree/master/src)</code> directory.

## Build from sources ##

After forking and/or cloning the project, you will need to install the following tools:

- Node and NPM: [instructions](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager), [official website](https://npmjs.org/)
- Grunt: [instructions](http://gruntjs.com/getting-started), [official website](http://gruntjs.com/)
- Bower: [instructions on official website](http://bower.io/)

Once you got them, got to the root of the project and run the following commands:

- <code>npm install</code>
- <code>grunt bower</code>
- <code>grunt</code>

This should drop quite some logs in your shell and use a bit of bandwith. Once it's completed, you should have the
RichFaces Widgets demo running on [localhost:9000](http://localhost:9000/) (hopefully, you didn't already had a process
running on that port).

## Contributors ##

Learn more by reading the [CONTRIBUTING.md](https://github.com/richfaces/richfaces-widgets/blob/master/CONTRIBUTING.md) file.

## License ##

Apache License Version 2.0. [Read more in the LICENSE.txt](https://github.com/richfaces/richfaces-widgets/blob/master/LICENSE.txt) file.
