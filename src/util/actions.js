const { browserAction } = require('./browser')()

const setBrowserAction = (tabId, changeInfo, tab) => {
  browserAction.setBadgeText({tabId, text: ''})
  browserAction.setBadgeBackgroundColor({tabId, color: 'transparent'})

  if (/^(:?https?|file):\/\//.test(tab.url)) {
    browserAction.enable(tabId)
  } else {
    browserAction.disable(tabId)
  }
}

module.exports = setBrowserAction
