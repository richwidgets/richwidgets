"use strict";

var path = require("path");
var lrSnippet = require("grunt-contrib-livereload/lib/utils").livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(path.resolve(dir));
};

var renamedTasks = {

};

module.exports = function (grunt) {
  var bower = require("bower");

  require("matchdep").filterDev("grunt-*").forEach(function (plugin) {
    grunt.loadNpmTasks(plugin);
    if (renamedTasks[plugin]) {
      grunt.renameTask(renamedTasks[plugin].original, renamedTasks[plugin].renamed);
    }
  });

  var configuration = {
    pkg : grunt.file.readJSON("package.json"),
    version: "0.0.1",
    dir: {
      src: {
        root: "src",
        styles: "<%= config.dir.src.root %>/styles",
        scripts: "<%= config.dir.src.root %>/scripts",
        fonts: "<%= config.dir.src.styles %>/fonts"
      },
      dist: {
        root: "dist",
        styles: "<%= config.dir.dist.root %>/styles",
        scripts: "<%= config.dir.dist.root %>/scripts",
        fonts: "<%= config.dir.dist.styles %>/fonts"
      },
      test: {
        root: "test"
      },
      examples: {
        root: "examples",
        styles: "<%= config.dir.examples.root %>/styles"
      },
      components: {
        root: "components"
      }
    }
  };

  grunt.registerTask("bowerCopy", [
    "copy:bowerFontAwesome",
    "copy:bowerJQuery",
    "copy:bowerLodash"
  ]);

  grunt.registerTask("default", [

  ]);

  grunt.registerTask("build", [
    "bowerCopy",
    "concat:bootstrap",
    "recessAsync:src",
    "uglify:src"
  ]);

  grunt.registerTask("server", [
    "build",
    "recessAsync:examples",
    "livereload-start",
    "connect:livereload",
    "regarde"
  ]);

  grunt.registerTask("dist", [
    "build",
    "copy:dist",
    "recessAsync:dist",
    "uglify:dist",
    "copy:dist"
  ]);

  grunt.registerTask("test", [
    "build",
    "karma:test"
  ]);

  grunt.registerMultiTask("recessAsync", "Run recess in its own process in order to be non-blocking", function () {
    var done = this.async();
    var self = this;

    grunt.util.spawn({
      grunt: true,
      args: ["recess:"+this.target]
    }, function (err) {
      var msg = " compiling LESS files in " + self.target.cyan;
      if (err) {
        grunt.log.error("ERROR".red + msg);
      } else {
        grunt.log.ok("OK".green + msg);
      }
      done();
    });
  });

  grunt.initConfig({
    config: configuration,

    clean: {
      dist: {}
    },

    concat: {
      bootstrap: {
        src: ["<%= config.dir.src.scripts %>/bootstrap/bootstrap-tooltip.js", "<%= config.dir.src.scripts %>/bootstrap/bootstrap-*.js"],
        dest: "<%= config.dir.src.scripts %>/bootstrap/bootstrap.js"
      }
    },

    recess: {
      src: {
        options: {
          compile: true
        },
        files: [{
          "<%= config.dir.dist.styles %>/richfaces.css": ["<%= config.dir.src.styles %>/richfaces/main.less"]
        }]
      },
      dist: {
        options: {
          compile: true,
          compress: true
        },
        files: [{
          "<%= config.dir.dist.styles %>/richfaces.min.css": ["<%= config.dir.src.styles %>/richfaces/main.less"]
        }]
      },
      examples: {
        options: {
          compile: true
        },
        files: [{
          "<%= config.dir.examples.styles %>/examples.css": ["<%= config.dir.examples.styles %>/examples.less"]
        }]
      }
    },

    // Fake task that will always forward to real "recess" task but required by Grunt
    // Must always be sync with "recess" for the 1st level of tasks
    recessAsync: {
      src: {},
      dist: {},
      examples: {}
    },

    uglify: {
      options: {
        banner: "// JBoss RedHat (c)\n"
      },
      src: {
        files: [{
          "<%= config.dir.dist.scripts %>/richfaces.js": ["<%= config.dir.src.scripts %>/richfaces/*.js"]
        }]
      },
      dist: {
        options: {
          compress: true
        },
        files: [{
          "<%= config.dir.dist.scripts %>/richfaces.min.js": ["<%= config.dir.src.scripts %>/richfaces/*.js"]
        }]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: "<%= config.dir.src.fonts %>",
          src: ["**"],
          dest: "<%= config.dir.dist.fonts %>"
        }]
      },
      // Here start the Bower hell: manual copying of all required resources installed with Bower
      // Prefix them all with "bower"
      // Be sure to add them to the "bowerCopy" task near the top of the file
      bowerFontAwesome: {
        files: [{
          expand: true,
          cwd: "<%= config.dir.components.root %>/font-awesome/build/assets/font-awesome/font/",
          src: ["*"],
          dest: "<%= config.dir.src.fonts %>/fontawesome"
        },
        {
          expand: true,
          cwd: "<%= config.dir.components.root %>/font-awesome/build/assets/font-awesome/less/",
          src: ["*.less"],
          dest: "<%= config.dir.src.styles %>/fontawesome/"
        }]
      },
      bowerJQuery: {
        files: [{
          expand: true,
          cwd: "<%= config.dir.components.root %>/jquery/",
          src: ["jquery.js", "jquery.min.js"],
          dest: "<%= config.dir.src.scripts %>/jquery/"
        }]
      },
      bowerLodash: {
        files: [{
          expand: true,
          cwd: "<%= config.dir.components.root %>/lodash/dist/",
          src: ["lodash.js", "lodash.min.js"],
          dest: "<%= config.dir.src.scripts %>/lodash/"
        }]
      }
    },

    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      test: {
        singleRun: true,
        autoWatch: false
      },
      auto: {
        autoWatch: true
      }
    },

    regarde: {
      less: {
        files: ["<%= config.dir.src.styles %>/**/*.less"],
        tasks: ["recessAsync:src"]
      },
      examples: {
        files: ["<%= config.dir.examples.styles %>/*.less"],
        tasks: ["recessAsync:examples"]
      },
      javascript: {
        files: ["<%= config.dir.src.scripts %>/**/*.js"],
        tasks: ["uglify:src"]
      },
      dist: {
        files: [
          "<%= config.dir.dist.scripts %>/*.js",
          "<%= config.dir.dist.styles %>/*.css",
          "<%= config.dir.examples.root %>/**.html",
          "<%= config.dir.examples.styles %>/*.css"
        ],
        tasks: ["livereload"]
      }
    },

    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, 'dist'),
              mountFolder(connect, 'examples'),
              mountFolder(connect, 'components')
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, 'dist'),
              mountFolder(connect, 'test')
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, 'dist'),
              mountFolder(connect, 'examples')
            ];
          }
        }
      }
    }
  });

};