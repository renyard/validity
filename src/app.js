const { tabs } = require('./util/browser')()
const source = require('./source')
const checkers = require('./checkers')
const reporters = require('./reporters')

module.exports = async () => {
  const [ tab ] = await tabs.query({active: true, currentWindow: true})
  const input = await source(tab.url)
  const results = await checkers(input)

  reporters(tab.id, results)
}
