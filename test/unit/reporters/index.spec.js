const td = require('testdouble')

describe('reporters', () => {
  let reporters
  let consoleStub
  let actionStub

  beforeEach(() => {
    consoleStub = td.replace('../../../src/reporters/console')
    actionStub = td.replace('../../../src/reporters/action', td.func())
    reporters = require('../../../src/reporters')
  })

  afterEach(() => {
    td.reset()
  })

  it('passes results to reporters', () => {
    reporters(1, [])
    td.verify(consoleStub(1, []))
    td.verify(actionStub(1, []))
  })
})
