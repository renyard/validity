const assert = require('assert')
const td = require('testdouble')

describe('app', () => {
  let app
  let sourceStub
  let checkersStub

  beforeEach(() => {
    sourceStub = td.replace('../../src/source')
    checkersStub = td.replace('../../src/checkers')

    td.when(sourceStub('https://host/file.html')).thenResolve('<!doctype html>')
    td.when(checkersStub('<!doctype html>')).thenResolve([])

    app = require('../../src/app')
  })

  afterEach(() => {
    td.reset()
  })

  it('returns result of checkers', async () => {
    let result = await app(1, 'https://host/file.html')

    assert.deepEqual(result, [])
  })
})
