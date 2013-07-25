var tests = Object.keys(window.__karma__.files).filter(function (file) {
  return /spec\.js$/.test(file);
});

requirejs.config({
  // Karma serves files from '/base'
  baseUrl: '/base/',
  appDir: '../',

  paths: {
    'jquery': 'components/jquery/jquery',
    'jquery-ui': 'components/jquery-ui/ui/jquery-ui',
    'widget-testing-base': 'test/utils/widget-test-base'
  },

  shim: {
    'jquery': {
      exports: 'jquery',
      init: function () {
        window.$ = window.jQuery = this.jQuery;
        return this.jQuery;
      }
    },
    'jquery-ui': {
      deps: ['jquery'],
      exports: 'jquery-ui'
    },
    'src/widgets/input/autocomplete': {
      deps: ['jquery', 'jquery-ui']
    }
  },

  // ask Require.js to load these files (all our tests)
  deps: tests,

  // start test run, once Require.js is done
  callback: window.__karma__.start
});