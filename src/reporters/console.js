const { tabs } = require('../util/browser')()

const escapeMessage = (message) =>
  message.replace(/(\r\n|\n|\r)/g, ' ').replace(/(['"])/g, '\\$1')

const addLine = (message, line) =>
  line ? `${message} (line ${line})` : message

module.exports = (tabId, results) => {
  const code = results[0].map(({type, message, line}) => {
    const method = type === 'error' ? 'error' : 'info'
    message = escapeMessage(message)
    message = addLine(message, line)

    return `console.${method}("${message}")`
  })

  tabs.executeScript(tabId, {
    code: code.join(';')
  })
}
