const source = require('./source')
const checkers = require('./checkers')
const reporters = require('./reporters')

module.exports = async () => {
  const { tabs } = require('./util/browser')()

  const tabsResult = await tabs.query({active: true, currentWindow: true})
  const [ tab ] = tabsResult
  const input = await source(tab.url)
  const results = await checkers(input)

  reporters(tab.id, results)
}
