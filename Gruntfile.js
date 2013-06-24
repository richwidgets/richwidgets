"use strict";

var path = require("path");

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

  grunt.registerTask("bower", [
    "shell:bowerInstall"
  ]);

  grunt.registerTask("build", [
    "recess:src",
    "uglify:src"
  ]);

  grunt.registerTask("default", [
    "build",
    "recess:examples",
    "connect:examples",
    "watch"
  ]);

  grunt.registerTask("dist", [
    "build",
    "copy:dist",
    "recess:dist",
    "uglify:dist",
    "copy:dist"
  ]);

  grunt.registerTask("test", [
    "build",
    "karma:test"
  ]);

  grunt.initConfig({
    config: configuration,

    clean: {
      dist: {}
    },

    recess: {
      src: {
        options: {
          compile: true
        },
        files: [{
          "<%= config.dir.dist.styles %>/richfaces.css": ["<%= config.dir.src.styles %>/main.less"]
        }]
      },
      dist: {
        options: {
          compile: true,
          compress: true
        },
        files: [{
          "<%= config.dir.dist.styles %>/richfaces.min.css": ["<%= config.dir.src.styles %>/main.less"]
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

    uglify: {
      options: {
        banner: "// JBoss RedHat (c)\n"
      },
      src: {
        files: [{
          "<%= config.dir.dist.scripts %>/richfaces.js": ["<%= config.dir.src.scripts %>/**/*.js"]
        }]
      },
      dist: {
        options: {
          compress: true
        },
        files: [{
          "<%= config.dir.dist.scripts %>/richfaces.min.js": ["<%= config.dir.src.scripts %>/**/*.js"]
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
      }
    },

    shell: {
      options: {
        stdout: true
      },
      bowerInstall: {
        command: "bower install"
      }
    },

    parallel: {
      options: {
        grunt: true
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

    watch: {
      options: {
        livereload: false,
        forever: true
      },
      less: {
        files: ["<%= config.dir.src.styles %>/**/*.less"],
        tasks: ["recess:src"]
      },
      examples: {
        files: ["<%= config.dir.examples.styles %>/*.less"],
        tasks: ["recess:examples"]
      },
      javascript: {
        files: ["<%= config.dir.src.scripts %>/**/*.js"],
        tasks: ["uglify:src"]
      },
      dist: {
        options: {
          livereload: true
        },
        files: [
          "<%= config.dir.dist.scripts %>/*.js",
          "<%= config.dir.dist.styles %>/*.css",
          "<%= config.dir.examples.root %>/**.html",
          "<%= config.dir.examples.styles %>/*.css"
        ],
        tasks: []
      }
    },

    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, 'dist'),
              mountFolder(connect, 'test'),
              mountFolder(connect, 'components')
            ];
          }
        }
      },
      examples: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, 'src'),
              mountFolder(connect, 'dist'),
              mountFolder(connect, 'examples'),
              mountFolder(connect, 'components')
            ];
          }
        }
      }
    }
  });

};
