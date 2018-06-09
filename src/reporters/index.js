const console = require('./console')

module.exports = (tabId, results) => Promise.all([console(tabId, results)])
