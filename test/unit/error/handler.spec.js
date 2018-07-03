const assert = require('assert')
const td = require('testdouble')

describe('error handler', () => {
  let handler
  let getMessageStub

  beforeEach(() => {
    getMessageStub = td.func()
    td.replace('../../../src/util/browser', () => ({
      i18n: {
        getMessage: getMessageStub
      }
    }))
    td.replace('../../../src/error/constants.json')

    handler = require('../../../src/error/handler')
  })

  afterEach(() => {
    td.reset()
  })

  it('returns string for known error', () => {
    let err = new Error()
    err.message = 'source_error'

    td.when(getMessageStub('ERR_SOURCE_ERROR')).thenReturn('expected message')

    const result = handler(err)
    assert.deepEqual(result, [{type: 'error', message: 'expected message'}])
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
