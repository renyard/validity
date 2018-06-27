const assert = require('assert')
const td = require('testdouble')

describe('error', () => {
  let constantsStub
  let handlerStub

  beforeEach(() => {
    constantsStub = td.replace('../../../src/error/constants.json')
    handlerStub = td.replace('../../../src/error/handler')
  })

  afterEach(() => {
    td.reset()
  })

  it('exports constants and handler', () => {
    const error = require('../../../src/error')

    assert.deepEqual(error.ERRORS, constantsStub)
    assert.equal(error.handler, handlerStub)
  })
})
