import app from '../src/app'

describe('app', () => {
  it('exists', () => {
    assert.isOk(app)
  })

  it('runs', () => {
    let result = app()

    assert.isUndefined(result)
  })
})
