const td = require('testdouble')

const browserAction = {
  onClicked: {
    addListener: td.func()
  }
}

const tabs = {
  query: td.func(),
  executeScript: td.func()
}

module.exports = ({tabId, tabUrl}) => {
  const tab = {
    id: tabId,
    url: tabUrl
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
