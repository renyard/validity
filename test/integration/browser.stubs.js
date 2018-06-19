const td = require('testdouble')

module.exports = ({tabId, tabUrl}) => {
  const browserAction = {
    onClicked: {
      addListener: td.func()
    }
  }

  const tab = {
    id: tabId,
    url: tabUrl
  }

  const tabs = {
    query: td.func(),
    executeScript: td.func()
  }

  td.when(tabs.query({active: true, currentWindow: true}))
    .thenResolve([ tab ])

  window.browser = {
    browserAction,
    tabs
  }

  return {
    browserAction,
    tabs
  }
}
