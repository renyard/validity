const cons = require('./console')

module.exports = (tabId, results) => Promise.all([cons(tabId, results)])
