const td = require('testdouble')

describe('reporters/action', () => {
  let action
  let browserStub = {
    browserAction: {
      setBadgeBackgroundColor: td.func(),
      setBadgeText: td.func()
    }
  }
  beforeEach(() => {
    td.replace('../../../src/util/browser', () => browserStub)
    action = require('../../../src/reporters/action')
  })

  afterEach(() => {
    td.reset()
  })

  it('sets browser action for a valid document', () => {
    action(1, [[]])

    td.verify(browserStub.browserAction.setBadgeBackgroundColor({
      tabId: 1,
      color: 'green'
    }))
    td.verify(browserStub.browserAction.setBadgeText({
      tabId: 1,
      text: ' '
    }))
  })

  it('sets browser action for an invalid document', () => {
    action(1, [[{
      type: 'error',
      message: ''
    }, {
      type: 'info',
      message: ''
    }]])

    td.verify(browserStub.browserAction.setBadgeBackgroundColor({
      tabId: 1,
      color: 'red'
    }))
    td.verify(browserStub.browserAction.setBadgeText({
      tabId: 1,
      text: '1'
    }))
  })

  it('sets browser action for a valid document with warnings', () => {
    action(1, [[{
      type: 'info',
      message: ''
    }, {
      type: 'info',
      message: ''
    }]])

    td.verify(browserStub.browserAction.setBadgeBackgroundColor({
      tabId: 1,
      color: 'orange'
    }))
    td.verify(browserStub.browserAction.setBadgeText({
      tabId: 1,
      text: '2'
    }))
  })

  it('sets browser action for a network error', () => {
    action(1, [[{
      type: 'network',
      message: ''
    }]])

    td.verify(browserStub.browserAction.setBadgeBackgroundColor({
      tabId: 1,
      color: 'red'
    }))
    td.verify(browserStub.browserAction.setBadgeText({
      tabId: 1,
      text: 'ERR'
    }))
  })
})
