const assert = require('assert')
const td = require('testdouble')

describe('app', () => {
  let app
  let checkersStub

  beforeEach(() => {
    checkersStub = td.replace('../../src/checkers')
    td.when(checkersStub('htmlFile')).thenResolve(['htmlFile'])
    app = require('../../src/app')
  })

  afterEach(() => {
    td.reset()
  })

  it('returns result of checkers', async () => {
    let result = await app('htmlFile')

    assert.deepEqual(result, ['htmlFile'])
  })
})
