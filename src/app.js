const source = require('./source')
const checkers = require('./checkers')

module.exports = async (tabId, url) => {
  const input = await source(url)
  const results = await checkers(input)
  return results
}
