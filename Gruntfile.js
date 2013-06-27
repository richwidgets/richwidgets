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
    grunt.loadNpmTasks('assemble-less');
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
        assets: "<%= config.dir.dist.root %>/assets",
        styles: "<%= config.dir.dist.root %>/styles",
        scripts: "<%= config.dir.dist.root %>/scripts",
        fonts: "<%= config.dir.dist.assets %>/font"
      },
      test: {
        root: "test"
      },
      examples: {
        root: "examples",
        styles: "<%= config.dir.examples.root %>/styles"
      },
      components: {
        root: "components",
        bootstrap: "<%= config.dir.components.root %>/bootstrap",
        fontawesome: "<%= config.dir.components.root %>/font-awesome"
      }
    }
  };

  grunt.registerTask("bower", [
    "shell:bowerInstall"
  ]);

  grunt.registerTask("build", [
    "copy:dist",
    "less:bootstrap",
    "less:fontawesome",
    "less:widgets"
  ]);

  grunt.registerTask("default", [
    "build",
    "less:examples",
    "connect:examples",
    "watch"
  ]);

  grunt.registerTask("dist", [
    "build",
    "less:dist",
    "uglify:dist",
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

    less: {
      options: {
        paths: ["<%= config.dir.src.styles %>", "<%= config.dir.components.root %>"]
      },
      bootstrap: {
          options: {
              paths: ["<%= config.dir.components.bootstrap %>/less"]
          },
        src: "<%= config.dir.components.bootstrap %>/less/bootstrap.less",
        dest: "<%= config.dir.dist.assets %>/css/bootstrap.css"
      },
      fontawesome: {
          options: {
              paths: ["<%= config.dir.components.fontawesome %>/less"]
          },
        src: "<%= config.dir.components.fontawesome %>/less/font-awesome.less",
        dest: "<%= config.dir.dist.assets %>/css/font-awesome.css"
      },
      widgets: {
        files: [{
          expand: true,
          cwd: "<%= config.dir.src.styles %>/richfaces",
          src: "*.less",
          dest: "<%= config.dir.dist.assets %>/css/richfaces",
          ext: ".css"
        }]
      },
      dist: {
          options: {
              yuicompress: true
          },
          src: "<%= config.dir.src.styles %>/main.less",
          dest: "<%= config.dir.dist.assets %>/richfaces.min.css"
      },
      examples: {
          options: {
              yuicompress: true
          },
          src: "<%= config.dir.examples.styles %>/examples.less",
          dest: "<%= config.dir.dist.styles %>/examples.css"
      }
    },

    uglify: {
      options: {
        banner: "// JBoss RedHat (c)\n"
      },
      dist: {
        options: {
          compress: true
        },
        files: [{
          "<%= config.dir.dist.assets %>/richfaces.min.js": ["<%= config.dir.src.scripts %>/**/*.js"]
        }]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: "<%= config.dir.components.fontawesome %>/font",
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
        tasks: ["less:widgets"]
      },
      examples: {
        files: ["<%= config.dir.examples.styles %>/*.less"],
        tasks: ["less:examples"]
      },
      dist: {
        options: {
          livereload: true
        },
        files: [
          "<%= config.dir.dist.scripts %>/*.js",
          "<%= config.dir.dist.styles %>/*.css",
          "<%= config.dir.dist.assets %>/css/richfaces/*.css",
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
        //hostname: 'localhost'
          hostname: '0.0.0.0'
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
