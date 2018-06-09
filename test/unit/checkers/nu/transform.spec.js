const assert = require('assert')

describe('checkers/nu/transform', () => {
  let transform

  beforeEach(() => {
    transform = require('../../../../src/checkers/nu/transform')
  })

  it('returns results', () => {
    const results = transform({messages: [
      {
        type: 'error',
        message: 'error description',
        lastLine: 1,
        lastColumn: 1
      }
    ]})
    assert.deepEqual(results, [
      {
        type: 'error',
        message: 'error description',
        line: 1,
        column: 1
      }
    ])
  })

  it('returns results when some entries are omitted', () => {
    const results = transform({messages: [
      {
        type: 'error',
        message: 'error description'
      }
    ]})
    assert.deepEqual(results, [
      {
        type: 'error',
        message: 'error description',
        line: undefined,
        column: undefined
      }
    ])
  })
})
