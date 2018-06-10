const assert = require('assert')

describe('util/browser', () => {
  let browser

  beforeEach(() => {
    browser = require('../../../src/util/browser')
  })

  afterEach(() => {
    delete global.window
  })

  it('returns browser in Firefox', () => {
    global.window = {
      browser: {}
    }

    assert.deepEqual(browser(), {})
  })

  it('returns chrome in Chrome', () => {
    global.window = {
      chrome: {}
    }

    assert.deepEqual(browser(), {})
  })

  it('returns undefined when extension API is not present', () => {
    global.window = {}

    assert.strictEqual(browser(), undefined)
  })
})
