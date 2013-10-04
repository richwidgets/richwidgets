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
    grunt.loadNpmTasks('grunt-karma');
    if (renamedTasks[plugin]) {
      grunt.renameTask(renamedTasks[plugin].original, renamedTasks[plugin].renamed);
    }
  });

  var configuration = {
    pkg: grunt.file.readJSON("package.json"),
    dir: {
      src: {
        root: "src",
        widgets: "<%= config.dir.src.root %>/widgets"
      },
      dist: {
        root: "dist",
        assets: "<%= config.dir.dist.root %>/assets",
        font: "<%= config.dir.dist.assets %>/font-awesome/font",
        richfaces: "<%= config.dir.dist.assets %>/richfaces",
        examples: {
          root: "<%= config.dir.dist.root %>/examples",
          styles: "<%= config.dir.dist.examples.root %>/styles"
        }
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
        fontawesome: "<%= config.dir.components.root %>/font-awesome",
        jquery: "<%= config.dir.components.root %>/jquery",
        jqueryui: "<%= config.dir.components.root %>/jquery-ui",
        flot: {
              lib: "<%= config.dir.components.root %>/flot",
              axisLabels: "<%= config.dir.components.root %>/flotAxisLabels",
              orderBars: "<%= config.dir.components.root %>/flotOrderBars",
              tooltip :  "<%= config.dir.components.root %>/flotTooltip"
          }
      }
    }
  };

  grunt.registerTask("bower", [
    "shell:bowerInstall"
  ]);

  grunt.registerTask("build", [
    "copy:font",
    "copy:jquery",
    "copy:jqueryui",
    "copy:flot",
    "less:bootstrap",
    "less:fontawesome",
    "less:widgets"
  ]);

  grunt.registerTask("default", [
    "build",
    "copy:js",
    "less:examples",
    "connect:examples",
    "watch"
  ]);

  grunt.registerTask("dist", [
    "clean",
    "build",
    "copy:js",
    "less:dist",
    "uglify:dist",
    "test",
  ]);

  grunt.registerTask("test", [
    "karma:test"
  ]);

  grunt.registerTask("travis", [
    "dist"
  ]);

  grunt.initConfig({
    config: configuration,

    clean: [ 'dist' ],

    less: {
      bootstrap: {
        options: {
          paths: ["<%= config.dir.components.bootstrap %>/less"]
        },
        src: "<%= config.dir.components.bootstrap %>/less/bootstrap.less",
        dest: "<%= config.dir.dist.assets %>/bootstrap/bootstrap.css"
      },
      fontawesome: {
        options: {
          paths: ["<%= config.dir.components.fontawesome %>/less"]
        },
        src: "<%= config.dir.src.root %>/font-awesome-richwidgets.less",
        dest: "<%= config.dir.dist.assets %>/font-awesome/font-awesome.css"
      },
      widgets: {
        options: {
          paths: ["<%= config.dir.src.root %>", "<%= config.dir.components.root %>"]
        },
        files: grunt.file.expandMapping("**/*.less", "<%= config.dir.dist.richfaces %>/", {
          cwd: "src/widgets",
          rename: function (destBase, destPath) {
            return destBase + destPath.replace(/\.less$/, '.css');
          }
        })
      },
      dist: {
        options: {
          paths: ["<%= config.dir.components.root %>"],
          yuicompress: true
        },
        src: "<%= config.dir.src.root %>/main.less",
        dest: "<%= config.dir.dist.assets %>/richfaces.min.css"
      },
      examples: {
        options: {
          yuicompress: true
        },
        src: "<%= config.dir.examples.styles %>/examples.less",
        dest: "<%= config.dir.dist.examples.styles %>/examples.css"
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
        files: [
          {
            "<%= config.dir.dist.assets %>/richfaces.min.js": ["<%= config.dir.src.widgets %>/**/*.js"]
          }
        ]
      }
    },

    copy: {
      font: {
        files: [
          {
            expand: true,
            cwd: "<%= config.dir.components.fontawesome %>/font",
            src: ["**"],
            dest: "<%= config.dir.dist.font %>"
          }
        ]
      },
      jquery: {
        files: [
          {
            expand: true,
            cwd: "<%= config.dir.components.jquery %>/ui",
            src: ["**"],
            dest: "<%= config.dir.dist.assets %>/jquery"
          }
        ]
      },
      jqueryui: {
        files: [
          {
            expand: true,
            cwd: "<%= config.dir.components.jqueryui %>/ui",
            src: ["**"],
            dest: "<%= config.dir.dist.assets %>/jquery-ui"
          }
        ]
      },
      flot: {
            files: [
                {
                    expand: true,
                    cwd: "<%= config.dir.components.flot.lib %>",
                    src: ['**.js','!**/examples/**','!jquery.js'],
                    dest: "<%= config.dir.dist.assets %>/flot"
                },
                {
                    expand: true,
                    cwd: "<%= config.dir.components.flot.axisLabels %>",
                    src: ["**.js"],
                    dest: "<%= config.dir.dist.assets %>/flot"
                },
                {
                    expand: true,
                    cwd: "<%= config.dir.components.flot.orderBars %>/js",
                    src: ["**.js"],
                    dest: "<%= config.dir.dist.assets %>/flot"
                },
                {
                    expand: true,
                    cwd: "<%= config.dir.components.flot.tooltip %>/js",
                    src: ["**.js","!jquery.flot.js"],
                    dest: "<%= config.dir.dist.assets %>/flot"
                }
            ]
        },
      js: {
        files: grunt.file.expandMapping("**/*.js", "<%= config.dir.dist.richfaces %>/", {
          cwd: "src/widgets",
          rename: function (destBase, destPath) {
            return destBase + destPath;
          }
        })
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
        files: ["<%= config.dir.src.root %>/**/*.less"],
        tasks: ["less:widgets"]
      },
      js: {
        files: ["<%= config.dir.src.widgets %>/**/*.js"],
        tasks: ["copy:js"]
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
          "<%= config.dir.dist.assets %>/**/*.js",
          "<%= config.dir.dist.assets %>/**/*.css",
          "<%= config.dir.examples.root %>/**/*.html",
          "<%= config.dir.dist.examples.styles %>/**.css"
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
