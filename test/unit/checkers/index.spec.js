const assert = require('assert')
const td = require('testdouble')

describe('checkers', () => {
  let checkers
  let nuStub

  beforeEach(() => {
    nuStub = td.replace('../../../src/checkers/nu')
    td.when(nuStub('htmlFile')).thenResolve('htmlFile')
    checkers = require('../../../src/checkers')
  })

  afterEach(() => {
    td.reset()
  })

  it('resolves array', async () => {
    const result = await checkers('htmlFile')
    assert.deepEqual(result, ['htmlFile'])
  })
})
