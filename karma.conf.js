module.exports = function(config) {

  /**
   * This is a configuration for Karma runner for continous integration purposes.
   *
   * You can modify the settings when running test suite from command line, refer to online documentation
   * for the runner or see comments bellow.
   */
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    frameworks: ['jasmine', 'requirejs'],

    // list of files / patterns to load in the browser
    files: [

      /**
       * the file which will be ran as the browser is started,
       * it start RequestJS dependency resolution and test loading
       */
      'test/test-main.js',

      /**
       * These files are loaded by Karma HTTP server which serves resources to test,
       * but they are not run automatically
       */
      // test dependencies
      {pattern: 'lib/jquery-simulate/jquery.simulate.js', included: false},
      {pattern: 'lib/jasmine-jquery/lib/jasmine-jquery.js', included: false},
      {pattern: 'lib/dom-compare/**/*.js', included: false},



      // runtime dependencies
      {pattern: 'lib/jquery/jquery.js', included: false},
      {pattern: 'lib/jquery-ui/ui/jquery-ui.js', included: false},

      {pattern: 'lib/flotAxisLabels/jquery.flot.axislabels.js', included:false},
      {pattern: 'lib/flotOrderBars/js/jquery.flot.orderBars.js', included:false},
      {pattern: 'lib/flotTooltip/js/jquery.flot.tooltip.js', included:false},
      {pattern: 'lib/flot/*.js', excluded:'/lib/flot/jquery.js', included:false},

      // richwidgets sources
      {pattern: 'src/**/*.js', included: false},
      {pattern: 'dist/assets/**/*.css', included: false},

      // tests
      {pattern: 'test/**/*.js', included: false},
      {pattern: 'test/**/*.html', included: false}
    ],

    /**
     * Sauce Labs configuration. Set your username in an environment variable SAUCE_USERNAME
     * and your access key to a variable SAUCE_ACCESS_KEY.
     */
    sauceLabs: {
      startConnect: true,
      testName: 'RichWidgets'
    },

    /**
     * This section defines custom launchers for Sauce Labs, i.e. browsers that can be used for testing.
     * For the list of all supported browsers see https://saucelabs.com/docs/platforms
     */
    customLaunchers: {
      SL_Chrome_latest: {
        base: 'SauceLabs',
        browserName: 'chrome'
      },
      SL_Firefox_ESR: {
        base: 'SauceLabs',
        browserName: 'firefox',
        version: 24
      },
      SL_Firefox_latest: {
        base: 'SauceLabs',
        browserName: 'firefox',
        version: 25
      },
      SL_IE_11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: 11,
        platform: "Windows 8.1"
      },
      SL_IE_10: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: 10,
        platform: "Windows 8"
      },
      SL_IE_9: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: 9,
        platform: "Windows 7"
      },
      SL_IE_8: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: 8,
        platform: "Windows 7"
      },
      SL_Safari_latest: {
        base: 'SauceLabs',
        browserName: 'safari',
        version: 6,
        platform: "OS X 10.8"
      },
      SL_Opera_latest: {
        base: 'SauceLabs',
        browserName: 'opera',
        version: 12
      },
      SL_iPhone_latest: {
        base: 'SauceLabs',
        browserName: 'iphone',
        version: "6.1",
        platform: "OS X 10.8"
      },
      SL_Android_4: {
        base: 'SauceLabs',
        browserName: 'android',
        version: "4.0",
        platform: "Linux"
      }
    },


    preprocessors: {
      // do not preprocess HTML files with html2js
      '**/*.html': []
    },


    // list of files to exclude
    exclude: [
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage', 'spec'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // cli runner port
    runnerPort: 9100,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    //
    // use $ karma ... -auto-watch=true from command-line
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    //
    // You can also run the tests on Sauce Labs using browsers defined in customLaunchers
    // section, e.g. SL_Chrome_latest.
    //
    // use $ karma ... -browsers=PhantomJS,Firefox,Chrome from command-line
    browsers: ['PhantomJS'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    //
    // use $ karma ... -single-run=false from command-line
    singleRun: true

  });

};