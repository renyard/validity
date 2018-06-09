const console = require('./console')

module.exports = (results) => Promise.all([console(results)])
