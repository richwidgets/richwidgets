/*global module:false*/


module.exports = function (grunt) {
  'use strict';
  var path = require('path');
  var mountFolder = function (connect, dir) {
    return connect.static(path.resolve(dir));
  };

  var configuration = {
    pkg: grunt.file.readJSON('package.json'),
    dir: {
      src: {
        root: 'src',
        demos: '<%= config.dir.src.root %>/demos',
        widgets: '<%= config.dir.src.root %>/widgets',
        config: '<%= config.dir.src.root %>/config'
      },
      dist: {
        root: 'dist',
        assets: '<%= config.dir.dist.root %>/assets',
        demos: '<%= config.dir.dist.root %>/demos',
        flot: '<%= config.dir.dist.assets %>/flot',
        font: '<%= config.dir.dist.assets %>/font-awesome/font',
        richwidgets: '<%= config.dir.dist.assets %>/richwidgets'
      },
      test: {
        root: 'test'
      },
      lib: {
        root: 'lib',
        bootstrap: '<%= config.dir.lib.root %>/bootstrap',
        fontawesome: '<%= config.dir.lib.root %>/font-awesome',
        jquery: '<%= config.dir.lib.root %>/jquery',
        jqueryui: '<%= config.dir.lib.root %>/jquery-ui',
        flot: {
          lib: '<%= config.dir.lib.root %>/flot',
          axisLabels: '<%= config.dir.lib.root %>/flotAxisLabels',
          orderBars: '<%= config.dir.lib.root %>/flotOrderBars',
          tooltip :  '<%= config.dir.lib.root %>/flotTooltip'
        },
        ckeditor: '<%= config.dir.lib.root %>/ckeditor',
        select2: '<%= config.dir.lib.root %>/select2',
        select2css: '<%= config.dir.lib.root %>/select2-bootstrap3-css',
        rcue: '<%= config.dir.lib.root %>/rcue'
      }
    },
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'
  };

  grunt.registerTask('bower', [
    'shell:bowerInstall'
  ]);

  grunt.registerTask('build', [
    'jshint',
    'copy:font',
    'copy:jquery',
    'copy:jqueryui',
    'copy:flot',
    'copy:ckeditor',
    'copy:select2',
    'copy:js',
    'less:bootstrap',
    'less:fontawesome',
    'less:widgets',
    'less:dist',
    'less:demo',
    'concat:flot',
    'uglify:dist',
    'copy:demoAssets',
    'copy:demoResources',
    'yuidoc'
  ]);

  grunt.registerTask('default', [
    'dist'
  ]);

  grunt.registerTask('dist', [
    'clean:dist',
    'build',
    'uglify:demo',
    'cssmin:demo',
    'assemble:production',
    'copy:demoAssetsProduction',
    'test'
  ]);

  grunt.registerTask('test', [
    'karma:test'
  ]);

  grunt.registerTask('travis', [
    'dist'
  ]);

  grunt.registerTask('dev', [
    'clean:demo',
    'build',
    'assemble:dev',
//    'karma:dev',
    'connect:dev',
    'watch'
  ]);

  grunt.registerTask('site', [
    'dist',
    'clean:pages',
    'gh-pages'
  ]);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: configuration,
    demo: grunt.file.readYAML('src/demos/data/site.yml'),

    clean: {
      dist: [ '<%= config.dir.dist.root %>' ],
      demo: ['<%= demo.destination %>/**/*.{html,md}', '<%= demo.destination %>/assets'],
      pages: ['.grunt/grunt-gh-pages/gh-pages'],
      bower: ['lib']
    },

    less: {
      bootstrap: {
        options: {
          paths: ['<%= config.dir.lib.rcue %>/less', '<%= config.dir.lib.root %>']
        },
        src: '<%= config.dir.src.widgets %>/bootstrap-richwidgets.less',
        dest: '<%= config.dir.dist.assets %>/bootstrap/bootstrap.css'
      },
      fontawesome: {
        options: {
          paths: ['<%= config.dir.lib.fontawesome %>/less']
        },
        src: '<%= config.dir.src.widgets %>/font-awesome-richwidgets.less',
        dest: '<%= config.dir.dist.assets %>/font-awesome/font-awesome.css'
      },
      widgets: {
        options: {
          paths: ['<%= config.dir.src.widgets %>', '<%= config.dir.lib.root %>']
        },
        files: grunt.file.expandMapping('*/**/*.less', '<%= config.dir.dist.richwidgets %>/', { // */**/*.less: exclude files in the widgets folder itself
          cwd: 'src/widgets',
          rename: function (destBase, destPath) {
            return destBase + destPath.replace(/\.less$/, '.css');
          }
        })
      },
      demo: {
        options: {
          paths: ['<%= config.dir.lib.root %>']
        },
        src: '<%= config.dir.src.demos %>/demo.less',
        dest: '<%= config.dir.dist.demos %>/assets/demo/demo.css'
      },
      dist: {
        options: {
          paths: ['<%= config.dir.src.widgets %>', '<%= config.dir.lib.root %>'],
          yuicompress: true
        },
        src: '<%= config.dir.src.widgets %>/main.less',
        dest: '<%= config.dir.dist.richwidgets %>/richwidgets.min.css'
      }
    },

    cssmin: {
      demo: {
        files: {
          '<%= config.dir.dist.demos %>/assets/demo/richwidgets-demo.min.css': ['<%= config.dir.dist.richwidgets %>/richwidgets.min.css', '<%= config.dir.dist.assets %>/font-awesome/font-awesome.css', '<%= config.dir.dist.demos %>/assets/demo/demo.css']
        }
      }
    },

    uglify: {
      options: {
        banner: '// JBoss RedHat (c)\n'
      },
      dist: {
        options: {
          compress: true
        },
        files: [
          {
            '<%= config.dir.dist.assets %>/richwidgets/richwidgets.min.js': ['<%= config.dir.dist.flot %>/richwidgets.flot.js', '<%= config.dir.src.widgets %>/**/*.js']
          }
        ]
      },
      demo: {
        options: {
          compress: true,
          nonull: true
        },
        files: [
          {
            '<%= config.dir.dist.demos %>/assets/demo/richwidgets-demo.min.js': [
              '<%= config.dir.dist.assets %>/jquery/jquery.min.js',
              '<%= config.dir.dist.assets %>/jquery-ui/minified/jquery-ui.min.js',
              '<%= config.dir.dist.flot %>/richwidgets.flot.js',
              '<%= config.dir.dist.richwidgets %>/richwidgets.min.js'
            ]
          }
        ]
      }
    },

    concat: {
      flot: {
        options: {
          separator: ';',
          nonull: true
        },
        src: [
          '<%= config.dir.dist.flot %>/jquery.flot.js',
          '<%= config.dir.dist.flot %>/jquery.flot.selection.js',
          '<%= config.dir.dist.flot %>/jquery.flot.pie.js',
          '<%= config.dir.dist.flot %>/jquery.flot.categories.js',
          '<%= config.dir.dist.flot %>/jquery.flot.symbol.js',
          '<%= config.dir.dist.flot %>/jquery.flot.tooltip.js',
          '<%= config.dir.dist.flot %>/jquery.flot.orderBars.js',
          '<%= config.dir.dist.flot %>/jquery.flot.resize.js'
        ],
        dest: '<%= config.dir.dist.flot %>/richwidgets.flot.js'
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: 'nofunc',
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: 'vars',
        boss: true,
        eqnull: true,
        browser: true,
        trailing: true,
        quotmark: 'single',
        camelcase:true
      },
      gruntfile: {
        options: {
          indent: 2,
          globals: {
            jQuery: true,
            require: true
          }
        },
        src: 'Gruntfile.js'
      },
      widgets: {
        options: {
          globals: {
            jQuery: true
          }
        },
        src: ['src/widgets/**/*.js']
      },
      demos: {
        options: {
          globals: {
            '$': true,
            module: true,
            require: true,
            source: true  // global used in autocomplete demos
          }
        },
        src: ['src/demos/**/*.js']
      },
      tests: {
        options: {
          camelcase:false,
          globals: {
            jQuery: true,
            '$': true,
            it: true,
            expect: true,
            runs: true,
            waitsFor: true,
            beforeEach: true,
            afterEach: true,
            define: true,
            describe: true,
            jasmine: true,
            requirejs: true
          }
        },
        src: ['test/**/*.js']
      }
    },

    copy: {
      font: {
        files: [
          {
            expand: true,
            cwd: '<%= config.dir.lib.fontawesome %>/fonts',
            src: ['**'],
            dest: '<%= config.dir.dist.font %>'
          }
        ]
      },
      jquery: {
        files: [
          {
            expand: true,
            cwd: '<%= config.dir.lib.jquery %>',
            src: ['*.js', '*.map'],
            dest: '<%= config.dir.dist.assets %>/jquery'
          }
        ]
      },
      jqueryui: {
        files: [
          {
            expand: true,
            cwd: '<%= config.dir.lib.jqueryui %>/ui',
            src: ['**'],
            dest: '<%= config.dir.dist.assets %>/jquery-ui'
          }
        ]
      },
      flot: {
        files: [
          {
            expand: true,
            cwd: '<%= config.dir.lib.flot.lib %>',
            src: ['**.js','!**/examples/**','!jquery.js'],
            dest: '<%= config.dir.dist.assets %>/flot'
          },
          {
            expand: true,
            cwd: '<%= config.dir.lib.flot.axisLabels %>',
            src: ['**.js'],
            dest: '<%= config.dir.dist.assets %>/flot'
          },
          {
            expand: true,
            cwd: '<%= config.dir.lib.flot.orderBars %>/js',
            src: ['**.js'],
            dest: '<%= config.dir.dist.assets %>/flot'
          },
          {
            expand: true,
            cwd: '<%= config.dir.lib.flot.tooltip %>/js',
            src: ['**.js','!jquery.flot.js'],
            dest: '<%= config.dir.dist.assets %>/flot'
          }
        ]
      },
      ckeditor: {
        files: [
          {
            expand: true,
            cwd: '<%= config.dir.lib.ckeditor %>',
            src: ['**.js', '!config.js', '**.css', 'lang/**', 'plugins/**', 'skins/**'],
            dest: '<%= config.dir.dist.assets %>/ckeditor'
          },
          {
            expand: true,
            cwd: '<%= config.dir.src.config %>/ckeditor',
            src: ['config.js'],
            dest: '<%= config.dir.dist.assets %>/ckeditor'
          }
        ]
      },
      select2: {
        files: [
          {
            expand: true,
            cwd: '<%= config.dir.lib.select2 %>',
            src: ['select2.js', 'select2.css', 'select2.png', 'select2-spinner.gif'],
            dest: '<%= config.dir.dist.assets %>/select2'
          },
          {
            expand: true,
            cwd: '<%= config.dir.lib.select2css %>',
            src: ['select2-bootstrap.css'],
            dest: '<%= config.dir.dist.assets %>/select2'
          }
        ]
      },
      js: {
        files: grunt.file.expandMapping('**/*.js', '<%= config.dir.dist.richwidgets %>/', {
          cwd: 'src/widgets',
          rename: function (destBase, destPath) {
            return destBase + destPath;
          }
        })
      },
      demoAssets: {
        options: {
          banner: '<%= banner %>'
        },
        files: [
          {
            expand: true,
            cwd: '<%= config.dir.lib.root %>',
            src: [
              'modernizr/modernizr.js',
              'highlightjs/highlight.pack.js',
              'highlightjs/styles/github.css',
              'bootstrap/js/dropdown.js',
              'bootstrap/js/collapse.js'
            ],
            dest: '<%= config.dir.dist.demos %>/assets/demo/'
          },
          {
            expand: true,
            cwd: '<%= config.dir.dist.font %>',
            src: '*',
            dest: '<%= config.dir.dist.demos %>/assets/demo/font/'
          },
          {
            expand: true,
            cwd: '<%= config.dir.lib.rcue %>/dist/fonts',
            src: '*',
            dest: '<%= config.dir.dist.demos %>/assets/demo/fonts/'
          },
          {
            expand: true,
            cwd: '<%= config.dir.src.demos %>/pages',
            src: ['**/*.{css,js}'],
            dest: '<%= config.dir.dist.demos %>/assets/demo/'
          }
        ]
      },
      demoResources: {
        files: [
          {
            expand: true,
            cwd: '<%= config.dir.src.demos %>',
            src: ['CNAME', '**/*.png'],
            dest: '<%= config.dir.dist.demos %>/'
          }
        ]
      },
      demoAssetsProduction: {
        files: [
          {
            expand: true,
            cwd: '<%= config.dir.dist.assets %>',
            src: ['**'],
            dest: '<%= config.dir.dist.demos %>/assets/'
          }
        ]
      }
    },

    shell: {
      options: {
        stdout: true
      },
      bowerInstall: {
        command: 'bower install'
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
      dev: {
        singleRun: false,
        autoWatch: false,
        background: true,  // run karma in a child process so it doesn't block subsequent grunt tasks
        reporters: 'dots'
      }
    },

    watch: {
      options: {
        livereload: false,
        forever: true
      },
      less: {
        files: ['<%= config.dir.src.widgets %>/**/*.less'],
        tasks: ['less:widgets']
      },
      js: {
        files: ['<%= config.dir.src.widgets %>/**/*.js'],
        tasks: ['copy:js', 'yuidoc']
      },
      // Activate once the following issue is resolved:
      // https://github.com/gruntjs/grunt-contrib-watch/issues/186
      // karma: {
      //   files: ['<%= config.dir.src.widgets %>/**/*.js', '<%= config.dir.test.root %>/**/*.js'],
      //   tasks: ['karma:dev:run']
      // },
      demo: {
        files: [
          '<%= config.dir.src.demos %>/**',
          'README.md',
          'CONTRIBUTING.md',
          'TESTS.md'
        ],
        tasks: ['less:demo', 'copy:demoAssets', 'assemble:dev']
      },
      dist: {
        options: {
          livereload: true
        },
        files: [
          '<%= config.dir.dist.assets %>/**/*.js',
          '<%= config.dir.dist.assets %>/**/*.css',
          '<%= config.dir.dist.demos %>/**/*.html'
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
              mountFolder(connect, 'dist/demos')
            ];
          }
        }
      },
      dev: {
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

    yuidoc: {
      compile: {
        name: '<%= config.pkg.name %>',
        description: '<%= config.pkg.description %>',
        logo: '../logo.png',
        version: '<%= config.pkg.version %>',
        url: '<%= config.pkg.homepage %>',
        options: {
          paths: 'src/widgets',
          themedir: 'lib/yuidoc-bootstrap-theme',
          helpers : ['lib/yuidoc-bootstrap-theme/helpers/helpers.js'],
          outdir: 'dist/demos/api'
        }
      }
    },

    assemble: {
      options: {
        prettify: {indent: 2},
        data: 'src/demos/**/*.{json,yml}',
        assets: './dist/demos/assets',
        helpers: ['src/demos/helpers/helper-*.js', 'node_modules/yfm/lib/*.js'],
        layoutdir: 'src/demos/templates/layouts',
        layout: 'default.hbs',
        partials: ['src/demos/templates/includes/**/*.hbs'],
        postprocess: function(content) {
          // replace links to github markdown files with relative links to html versions of the files
          content = content.replace(/https:\/\/github\.com\/richwidgets\/richwidgets\/blob\/master\/([a-zA-Z]*)\.md/g, function(match, name) {
            return name === 'README' ? 'about.html' : name.toLowerCase() + '.html';
          });
          return content;
        }
      },
      production: {
        options: {production: true},
        files: [
          { expand: true, cwd: 'src/demos/pages', src: ['**/*.hbs'], dest: '<%= demo.destination %>/' }
        ]
      },
      dev: {
        options: {production: false},
        files: [
          { expand: true, cwd: 'src/demos/pages', src: ['**/*.hbs'], dest: '<%= demo.destination %>/' }
        ]
      }
    },

    'gh-pages': {
      options: {
        base: 'dist/demos',
        branch: 'master',
        repo: 'git@github.com:richwidgets/richwidgets.github.io.git'
      },
      src: ['**']
    }
  });

  // load all the grunt-* dependencies found in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(function (plugin) {
    grunt.loadNpmTasks(plugin);
  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('assemble-less');  // not related to assemble
};
