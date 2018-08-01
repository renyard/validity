const td = require('testdouble')

describe('util/actions', () => {
  let setBrowserAction
  let browserStubs = {
    browserAction: {
      enable: td.func(),
      disable: td.func(),
      setBadgeText: td.func(),
      setBadgeBackgroundColor: td.func()
    }
  }

  beforeEach(() => {
    td.replace('../../../src/util/browser', () => browserStubs)
    setBrowserAction = require('../../../src/util/actions')
  })

  afterEach(() => {
    td.reset()
  })

  it('setBrowserAction with URL', () => {
    setBrowserAction(1, {}, {url: 'https://host'})

    td.verify(browserStubs.browserAction.enable(1))
  })

  it('setBrowserAction no URL', () => {
    setBrowserAction(1, {}, {})

    td.verify(browserStubs.browserAction.disable(1))
  })

  it('setBrowserAction with undefined URL', () => {
    setBrowserAction(1, {}, {url: undefined})

    td.verify(browserStubs.browserAction.disable(1))
  })

  it('setBrowserAction with empty URL', () => {
    setBrowserAction(1, {}, {url: ''})

    td.verify(browserStubs.browserAction.disable(1))
  })
})
