const td = require('testdouble')

describe('reporters', () => {
  let reporters
  let consoleStub

  beforeEach(() => {
    consoleStub = td.replace('../../../src/reporters/console')
    reporters = require('../../../src/reporters')
  })

  afterEach(() => {
    td.reset()
  })

  it('passes results to reporters', () => {
    reporters([])
    td.verify(consoleStub([]))
  })
})
