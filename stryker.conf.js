module.exports = function (config) {
  config.set({
    testRunner: 'mocha',
    mutator: 'javascript',
    transpilers: [],
    reporter: ['clear-text', 'progress'],
    coverageAnalysis: 'all',
    mutate: ['src/**/*.js']
  })
}
