const source = require('./source')
const checkers = require('./checkers')
const reporters = require('./reporters')
const error = require('./error')

module.exports = async () => {
  const { tabs } = require('./util/browser')()

  const tabsResult = await tabs.query({active: true, currentWindow: true})
  const [ tab ] = tabsResult

  let results
  try {
    const input = await source(tab.url)
    results = await checkers(input)
  } catch (err) {
    error(err)
  }

  reporters(tab.id, results)
}
