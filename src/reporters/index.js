const cons = require('./console')
const action = require('./action')

module.exports = (tabId, results) => Promise.all(
  [cons(tabId, results), action(tabId, results)]
)
