// Karma configuration
// Generated on Thu Oct 15 2015 23:49:50 GMT+0100 (BST)

module.exports = function(config) {
  var conf = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['qunit'],


    // list of files / patterns to load in the browser
    files: [
      'test/mocks.js',
      'test/fixtures/xmlfixtures.js',
      'test/fixtures/jsonfixtures.js',
      'src/**/*.js',
      'test/tests.js',
      {
          pattern: 'src/**/*',
          included: false,
          watched: true
      },
      {
        pattern: 'test/fixtures/**/*',
        included: false,
        watched: false
      }
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'src/**/*.js': ['coverage']
    },


    proxies: {
        '/_locales/': '/base/dist/_locales/',
        '/fixtures/': '/base/test/fixtures/'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
		reporters: [
			{
				type: 'text'
			}
		]
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
		'ChromeCI'
	],

    customLaunchers: {
        ChromeCI: {
            base: 'Chrome',
            flags: ['--no-sandbox']
        }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  };

  config.set(conf);
}
