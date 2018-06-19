const td = require('testdouble')
const request = require('superagent')
const samConfig = require('./superagent.stubs')

describe('validity', () => {
  let validate
  let stubBrowser
  let browserStubs
  let superagentMock

  beforeEach(() => {
    stubBrowser = require('./browser.stubs')

    browserStubs = stubBrowser({tabId: 1, tabUrl: 'https://host/path'})

    superagentMock = require('superagent-mock')(request, samConfig)
    validate = require('../../src/app')
  })

  afterEach(() => {
    td.reset()
    superagentMock.unset()
  })

  it('valid document', async () => {
    await validate()

    td.verify(browserStubs.tabs.executeScript(1, {
      code: ''
    }))
  })
})
