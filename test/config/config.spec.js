const assert = require('assert')
const td = require('testdouble')

describe('config', function () {
  let config
  let storageStub

  beforeEach(() => {
    storageStub = td.replace('../../src/config/storage')
    td.when(storageStub.get('userkey')).thenReturn('uservalue')
    td.replace('../../src/config/defaults.json', {'foo': 'bar', 'baz': 'qux'})
    config = require('../../src/config/config')
  })

  afterEach(() => {
    td.reset()
  })

  it('exports get and set functions', function () {
    assert(typeof config.get === 'function')
    assert(typeof config.set === 'function')
  })

  it('get default', async function () {
    assert.strictEqual(await config.get('foo'), 'bar')
    assert.strictEqual(await config.get('baz'), 'qux')
  })

  it('get user config', async () => {
    assert.strictEqual(await config.get('userkey'), 'uservalue')
  })

  it('set', function () {
    config.set('newkey1', 'newvalue1')
    config.set('newkey2', 'newvalue2')

    td.verify(storageStub.set('newkey1', 'newvalue1'))
    td.verify(storageStub.set('newkey2', 'newvalue2'))
  })
})
