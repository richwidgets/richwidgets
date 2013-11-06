/**
 * The tests and their dependencies are loaded using AMD (RequestJS).
 *
 * This config scans for test files, loads their dependencies and kicks off test run.
 */
(function () {

  requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/',
    appDir: '../',

    /**
     * Specifies where named modules can be found, relatively to the base of deployment
     */
    paths: {

      // test modules
      'jquery-simulate': 'lib/jquery-simulate/jquery.simulate',
      'widget-test-base': 'test/utils/widget-test-base',
      'jquery-jasmine': 'lib/jasmine-jquery/lib/jasmine-jquery',

      // library dependencies modules
      'jquery': 'lib/jquery/jquery',
      'jquery-ui': 'lib/jquery-ui/ui/jquery-ui'
    },

    /**
     * Provides configuration for libraries which doesn't provide AMD configuration
     */
    shim: {
      // test modules
      'jquery-simulate': { deps: ['jquery'] },
      'jquery-jasmine': { deps: ['jquery'] },

      // library dependencies modules
      'jquery': {
        exports: 'jquery',
        init: function () {
          window.$ = window.jQuery = this.jQuery;
          return this.jQuery;
        }
      },
      'jquery-ui': { deps: ['jquery'], exports: 'jquery-ui' },

      // richwidgets modules
      'src/widgets/input/autocomplete': { deps: ['jquery', 'jquery-ui'] },
      'src/widgets/select/ordering-list': { deps: ['jquery', 'jquery-ui'] },
      'src/widgets/select/pick-list': { deps: ['jquery', 'jquery-ui', 'src/widgets/select/ordering-list'] }
    },

    // ask Require.js to load these files (all our tests)
    deps: getTestFiles(),

    // start test run, once Require.js dependencies are loaded
    callback: window.__karma__.start
  });

  /**
   * Karma loads all the files specified in `files` property in karma.conf.js.
   *
   * It provides list of loaded files in `window.__karma__.files` property.
   *
   * We need to filter these files using inclusion and exclusion patterns,
   * so that test sources are loaded by AMD. Those tests then declares
   * own dependencies.
   */
  function getTestFiles() {

    // the inclusion pattern for test files
    var inclusions = [
      /\/test\/.*\.js$/
    ];

    // the inclusion pattern will be cut by following exclusions
    var exclusions = [
      /test-main.js$/,
      /\/test\/utils\//,
      /\/lib\//
    ];

    return Object.keys(window.__karma__.files).filter(function (file) {
      var included = inclusions.some(function(include) {
        return include.test(file);
      });
      if (!included) {
        return false;
      }
      var excluded = exclusions.some(function(exclude) {
        return exclude.test(file);
      });
      if (excluded) {
        return false;
      }
      return true;
    });
  }

})();