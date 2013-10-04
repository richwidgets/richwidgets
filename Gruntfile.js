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
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('assemble-less');  // not related to assemble
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
        demos: "<%= config.dir.src.root %>/demos",
        widgets: "<%= config.dir.src.root %>/widgets"
      },
      dist: {
        root: "dist",
        assets: "<%= config.dir.dist.root %>/assets",
        demos: "<%= config.dir.dist.root %>/demos",
        font: "<%= config.dir.dist.assets %>/font-awesome/font",
        richfaces: "<%= config.dir.dist.assets %>/richfaces"
      },
      test: {
        root: "test"
      },
      lib: {
        root: "lib",
        bootstrap: "<%= config.dir.lib.root %>/bootstrap",
        fontawesome: "<%= config.dir.lib.root %>/font-awesome",
        jquery: "<%= config.dir.lib.root %>/jquery",
        jqueryui: "<%= config.dir.lib.root %>/jquery-ui",
        flot: {
              lib: "<%= config.dir.lib.root %>/flot",
              axisLabels: "<%= config.dir.lib.root %>/flotAxisLabels",
              orderBars: "<%= config.dir.lib.root %>/flotOrderBars",
              tooltip :  "<%= config.dir.lib.root %>/flotTooltip"
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
    "copy:modernizr",
    "copy:flot",
    "less:bootstrap",
    "less:fontawesome",
    "less:widgets"
  ]);

  grunt.registerTask("default", [
    "build",
    "copy:js",
    "connect:demo",
    "watch"
  ]);

  grunt.registerTask("dist", [
    "clean:dist",
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

  grunt.registerTask("demo", [
    "clean:dist",
    "build",
    "copy:js",
    "less:dist",
    "uglify:dist",
    "assemble"
  ]);

  grunt.initConfig({
    config: configuration,
    demo: grunt.file.readYAML('src/demos/data/site.yml'),

    clean: {
      dist: [ 'dist' ],
      demo: ['<%= demo.destination %>/**/*.{html,md}']
    },

    less: {
      bootstrap: {
        options: {
          paths: ["<%= config.dir.lib.bootstrap %>/less"]
        },
        src: "<%= config.dir.lib.bootstrap %>/less/bootstrap.less",
        dest: "<%= config.dir.dist.assets %>/bootstrap/bootstrap.css"
      },
      fontawesome: {
        options: {
          paths: ["<%= config.dir.lib.fontawesome %>/less"]
        },
        src: "<%= config.dir.src.widgets %>/font-awesome-richwidgets.less",
        dest: "<%= config.dir.dist.assets %>/font-awesome/font-awesome.css"
      },
      widgets: {
        options: {
          paths: ["<%= config.dir.src.widgets %>", "<%= config.dir.lib.root %>"]
        },
        files: grunt.file.expandMapping("*/**/*.less", "<%= config.dir.dist.richfaces %>/", { // exclude files in the widgets folder itself
          cwd: "src/widgets",
          rename: function (destBase, destPath) {
            return destBase + destPath.replace(/\.less$/, '.css');
          }
        })
      },
      dist: {
        options: {
          paths: ["<%= config.dir.src.widgets %>", "<%= config.dir.lib.root %>"],
          yuicompress: true
        },
        src: "<%= config.dir.src.widgets %>/main.less",
        dest: "<%= config.dir.dist.assets %>/richfaces.min.css"
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
            cwd: "<%= config.dir.lib.fontawesome %>/font",
            src: ["**"],
            dest: "<%= config.dir.dist.font %>"
          }
        ]
      },
      modernizr: {
        files: [
          {
            expand: true,
            cwd: "<%= config.dir.lib.root %>/modernizr",
            src: ["modernizr.js"],
            dest: "<%= config.dir.dist.assets %>/modernizr"
          }
        ]
      },
      jquery: {
        files: [
          {
            expand: true,
            cwd: "<%= config.dir.lib.jquery %>",
            src: ["*.js", "*.map"],
            dest: "<%= config.dir.dist.assets %>/jquery"
          }
        ]
      },
      jqueryui: {
        files: [
          {
            expand: true,
            cwd: "<%= config.dir.lib.jqueryui %>/ui",
            src: ["**"],
            dest: "<%= config.dir.dist.assets %>/jquery-ui"
          }
        ]
      },
      flot: {
            files: [
                {
                    expand: true,
                    cwd: "<%= config.dir.lib.flot.lib %>",
                    src: ['**.js','!**/examples/**','!jquery.js'],
                    dest: "<%= config.dir.dist.assets %>/flot"
                },
                {
                    expand: true,
                    cwd: "<%= config.dir.lib.flot.axisLabels %>",
                    src: ["**.js"],
                    dest: "<%= config.dir.dist.assets %>/flot"
                },
                {
                    expand: true,
                    cwd: "<%= config.dir.lib.flot.orderBars %>/js",
                    src: ["**.js"],
                    dest: "<%= config.dir.dist.assets %>/flot"
                },
                {
                    expand: true,
                    cwd: "<%= config.dir.lib.flot.tooltip %>/js",
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
        files: ["<%= config.dir.src.widgets %>/**/*.less"],
        tasks: ["less:widgets"]
      },
      js: {
        files: ["<%= config.dir.src.widgets %>/**/*.js"],
        tasks: ["copy:js"]
      },
      demo: {
        files: ["<%= config.dir.src.demos %>/**/*.hbs"],
        tasks: ["assemble"]
      },
      dist: {
        options: {
          livereload: true
        },
        files: [
          "<%= config.dir.dist.assets %>/**/*.js",
          "<%= config.dir.dist.assets %>/**/*.css",
          "<%= config.dir.dist.demos %>/**/*.html",
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
      demo: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, 'dist/demos'),
              mountFolder(connect, 'dist')
            ];
          }
        }
      }
    },

    assemble: {
      options: {
        prettify: {indent: 2},
        data: 'src/demos/**/*.{json,yml}',
        assets: './dist/assets',
        layoutdir: 'src/demos/templates/layouts',
        layout: 'default.hbs',
        partials: ['src/demos/templates/includes/**/*.hbs']
      },
      demos: {
        options: {layout: 'default.hbs'},
        files: [
          { expand: true, cwd: 'src/demos/pages', src: ['**/*.hbs'], dest: '<%= demo.destination %>/' }
        ]
      }
    }

  });

};
