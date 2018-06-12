const assert = require('assert')

describe('reporters/console', () => {
  let console
  beforeEach(() => {
    console = require('../../../../src/reporters/console')
  })

  xit('does not throw', () => {
    assert.doesNotThrow(console)
  })
})
