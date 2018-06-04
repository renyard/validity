const assert = require('assert')

const app = require('../src/app')

describe('app', () => {
  it('exists', () => {
    assert.notEqual(app, undefined)
  })

  it('runs', () => {
    let result = app()

    assert.strictEqual(result, undefined)
  })
})
