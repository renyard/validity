const assert = require('assert')

describe('config/provider/chromiumStorage', () => {
  let chromiumStorage

  beforeEach(() => {
    chromiumStorage = require('../../../src/config/provider/chromiumStorage')
  })

  it('exports get and set methods', () => {
    assert.strictEqual(typeof chromiumStorage.get, 'function')
    assert.strictEqual(typeof chromiumStorage.set, 'function')
  })

  it('get and set functions do not throw', () => {
    assert.doesNotThrow(chromiumStorage.get)
    assert.doesNotThrow(chromiumStorage.set)
  })
})
