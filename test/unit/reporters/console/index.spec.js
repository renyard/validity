const td = require('testdouble')

describe('reporters/console', () => {
  let cons
  let executeScriptStub

  beforeEach(() => {
    global.window = {
      console: {
        warn: td.func(),
        info: td.func()
      }
    }
    executeScriptStub = td.func()
    td.replace('../../../../src/util/browser', () => ({
      tabs: {
        executeScript: executeScriptStub
      }
    }))
    cons = require('../../../../src/reporters/console')
  })

  afterEach(() => {
    delete global.window
    td.reset()
  })

  it('calls tabs.executeScript', () => {
    cons(1, [[]])
    td.verify(executeScriptStub(1, {code: ''}))
  })

  it('generates logging code for results', () => {
    cons(2, [[{
      type: 'error',
      message: 'message content'
    }, {
      type: 'warning',
      message: 'another message',
      line: '42'
    }]])

    td.verify(executeScriptStub(2, {
      code: 'console.error("message content");' +
        'console.info("another message (line 42)")'
    }))
  })
})
