module.exports = function(config) {

  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    frameworks: ['jasmine', 'requirejs'],

    // list of files / patterns to load in the browser
    files: [

      'test/test-main.js',

      {pattern: 'components/jquery/jquery.js', included: false},
      {pattern: 'components/jquery-simulate/jquery.simulate.js', included: false},
      {pattern: 'components/jasmine-jquery/lib/jasmine-jquery.js', included: false},
      {pattern: 'components/jquery-ui/ui/jquery-ui.js', included: false},
      {pattern: 'components/dom-compare/**/*.js', included: false},
      {pattern: 'dist/assets/**/*.css', included: false},


      {pattern: 'src/**/*.js', included: false},

      {pattern: 'test/**/*.js', included: false},
      {pattern: 'test/**/*.html', included: false}
    ],


    preprocessors: {
      // do not preprocess HTML files with html2js
      '**/*.html': []
    },


    // list of files to exclude
    exclude: [

    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
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
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true

  });

};