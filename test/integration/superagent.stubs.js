module.exports = [{
  pattern: 'https://host/path',
  fixtures: () => '<!doctype html>',
  get: (match, data) => data
}]
