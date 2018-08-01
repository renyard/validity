const { browserAction } = require('../util/browser')()

const countErrors = (messages) => messages.reduce((acc, error) => {
  if (error.type === 'network') {
    acc.network++
  } else if (error.type === 'error') {
    acc.error++
  } else {
    acc.info++
  }
  return acc
}, {error: 0, info: 0, network: 0})

module.exports = (tabId, results) => {
  const count = countErrors(results[0])
  let color = 'transparent'
  let text = ''

  if (count.network > 0) {
    color = 'red'
    text = 'ERR'
  } else if (count.error > 0) {
    color = 'red'
    text = `${count.error}`
  } else if (count.info > 0) {
    color = 'orange'
    text = `${count.info}`
  } else {
    color = 'green'
    text = ' '
  }

  browserAction.setBadgeBackgroundColor({tabId, color})
  browserAction.setBadgeText({tabId, text})
}
