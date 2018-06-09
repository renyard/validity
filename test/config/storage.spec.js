const td = require('testdouble')

describe('config/storage', function () {
  let storage
  let providerStub

  beforeEach(() => {
    providerStub = td.replace('../../src/config/provider/chromiumStorage')
    storage = require('../../src/config/storage')
  })

  afterEach(() => td.reset())

  it('get on single call', function () {
    storage.get('key')

    td.verify(providerStub.get('key'))
  })

  it('get on multiple calls', function () {
    storage.get('key')
    storage.get('key2')

    td.verify(providerStub.get('key'))
    td.verify(providerStub.get('key2'))
  })

  it('set on single call', function () {
    storage.set('key', 'value')

    td.verify(providerStub.set('key', 'value'))
  })

  it('set on multiple calls', function () {
    storage.set('key', 'value')
    storage.set('key2', 'value2')

    td.verify(providerStub.set('key', 'value'))
    td.verify(providerStub.set('key2', 'value2'))
  })
})
