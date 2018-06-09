const assert = require('assert')

describe('reporters/console', () => {
  let console
  beforeEach(() => {
    console = require('../../../../src/reporters/console')
  })

  it('does not throw', () => {
    assert.doesNotThrow(console)
  })
})
