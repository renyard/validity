const assert = require('assert')

describe('checkers/nu/transform', () => {
  let transform

  beforeEach(() => {
    transform = require('../../../src/checkers/nu/transform')
  })

  it('returns results', () => {
    assert.deepEqual(transform({}), {})
  })
})
