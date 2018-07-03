const td = require('testdouble')

const browserAction = {
  onClicked: {
    addListener: td.func()
  }
}

const i18n = {
  getMessage: td.func()
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

  td.when(i18n.getMessage(), {ignoreExtraArgs: true}).thenReturn('')
  td.when(i18n.getMessage('ERR_SOURCE_ERROR')).thenReturn('ERR_SOURCE_ERROR')
  td.when(i18n.getMessage('ERR_VALIDATOR_ERROR')).thenReturn('ERR_VALIDATOR_ERROR')

  td.when(tabs.query({active: true, currentWindow: true}))
    .thenResolve([ tab ])

  window.browser = {
    i18n,
    browserAction,
    tabs
  }

  return {
    browserAction,
    i18n,
    tabs
  }
}
