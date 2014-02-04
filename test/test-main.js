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
      'jquery-ui': 'lib/jquery-ui/ui/jquery-ui',
      'jquery.flot': 'lib/flot/jquery.flot',
      'jquery.flot.tooltip': 'lib/flotTooltip/js/jquery.flot.tooltip',
      'jquery.flot.orderBars': 'lib/flotOrderBars/js/jquery.flot.orderBars',
      'jquery.flot.axisLabels': 'lib/flotAxisLabels/jquery.flot.axislabels',

      'jquery.colorhelpers':'lib/flot/jquery.colorhelpers',
      'jquery.flot.canvas' : 'lib/flot/jquery.flot.canvas',
      'jquery.flot.categories' : 'lib/flot/jquery.flot.categories',
      'jquery.flot.crosshair' : 'lib/flot/jquery.flot.crosshair',
      'jquery.flot.errorbars' : 'lib/flot/jquery.flot.errorbars',
      'jquery.flot.fillbetween' : 'lib/flot/jquery.flot.fillbetween',
      'jquery.flot.image' : 'lib/flot/jquery.flot.image',
      'jquery.flot.navigate' : 'lib/flot/jquery.flot.navigate',
      'jquery.flot.pie' : 'lib/flot/jquery.flot.pie',
      'jquery.flot.resize' : 'lib/flot/jquery.flot.resize',
      'jquery.flot.selection' : 'lib/flot/jquery.flot.selection',
      'jquery.flot.stack' : 'lib/flot/jquery.flot.stack',
      'jquery.flot.symbol' : 'lib/flot/jquery.flot.symbol',
      'jquery.flot.threshold' : 'lib/flot/jquery.flot.threshold',
      'jquery.flot.time' : 'lib/flot/jquery.flot.time',
      'flotlib':'test/utils/flot-lib-module'

    },

    /**
     * Provides configuration for libraries which doesn't provide AMD configuration
     */
    shim: {
      // test modules
      'jquery-simulate': { deps: ['jquery'] },
      'jquery-jasmine': { deps: ['jquery'] },

      'jquery.flot': {
            deps:['jquery'],
            exports: '$.plot'
      },
      'jquery.flot.tooltip': { deps: ['jquery','jquery.flot']},
      'jquery.flot.axisLabels': { deps: ['jquery','jquery.flot']},
      'jquery.flot.orderBars': { deps: ['jquery','jquery.flot']},

      'jquery.colorhelpers' : { deps: ['jquery','jquery.flot'] },
      'jquery.flot.canvas' : { deps: ['jquery','jquery.flot'] },
      'jquery.flot.categories' : { deps: ['jquery','jquery.flot'] },
      'jquery.flot.crosshair' : { deps: ['jquery','jquery.flot'] },
      'jquery.flot.errorbars' : { deps: ['jquery','jquery.flot'] },
      'jquery.flot.fillbetween' : { deps: ['jquery','jquery.flot'] },
      'jquery.flot.image' : { deps: ['jquery','jquery.flot'] },
      'jquery.flot.navigate' : { deps: ['jquery','jquery.flot'] },
      'jquery.flot.pie' : { deps: ['jquery','jquery.flot'] },
      'jquery.flot.resize' : { deps: ['jquery','jquery.flot'] },
      'jquery.flot.selection' : { deps: ['jquery','jquery.flot'] },
      'jquery.flot.stack' : { deps: ['jquery','jquery.flot'] },
      'jquery.flot.symbol' : { deps: ['jquery','jquery.flot'] },
      'jquery.flot.threshold' : { deps: ['jquery','jquery.flot'] },
      'jquery.flot.time' : { deps: ['jquery','jquery.flot'] },


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
      'src/widgets/output/chart': { deps: ['jquery', 'jquery-ui','flotlib'] },
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