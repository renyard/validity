const source = require('./source')
const checkers = require('./checkers')
const reporters = require('./reporters')
const setBrowserAction = require('./util/actions')
const error = require('./error')

module.exports = async () => {
  const { tabs } = require('./util/browser')()

  const tabsResult = await tabs.query({active: true, currentWindow: true})
  const [ tab ] = tabsResult

  setBrowserAction(tab.id, {}, tab)

  let results
  try {
    const input = await source(tab.url)
    results = await checkers(input)
  } catch (err) {
    results = error.handler(err)
  }

  reporters(tab.id, results)
}
