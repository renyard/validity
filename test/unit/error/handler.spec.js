const assert = require('assert')
const td = require('testdouble')

describe('error handler', () => {
  let handler

  beforeEach(() => {
    td.replace('../../../src/error/constants.json')

    handler = require('../../../src/error/handler')
  })

  afterEach(() => {
    td.reset()
  })

  it('reports known errors', () => {
    let err = new Error()
    err.message = 'source_error'

    try {
      handler(err)
      assert.ok(true)
    } catch (e) {
      if (e === err) {
        assert.fail('threw known error')
      } else {
        assert.fail(e)
      }
    }
  })

  it('throws unknown error', () => {
    const err = new Error()

    try {
      handler(err)
      assert.fail('Did not throw')
    } catch (e) {
      assert.strictEqual(e, err)
    }
  })
})
