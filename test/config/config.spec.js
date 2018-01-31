import {assert} from 'chai'
import sinon from 'sinon'
import {get, set, __RewireAPI__ as config} from '../../src/config/config'

describe('config', function () {
  let storageStub = {
    get: sinon.stub(),
    set: sinon.stub()
  }

  storageStub.get.returns(undefined)
  storageStub.get.withArgs('userkey').returns('uservalue')

  let defaults = '{"foo": "bar"}'

  beforeEach(() => {
    config.__set__('storage', storageStub)
    config.__set__('request', async () => defaults)
  })

  afterEach(() => {
    config.__ResetDependency__('storage')
    config.__ResetDependency__('init')
  })

  it('exports get and set functions', function () {
    assert.isFunction(get)
    assert.isFunction(set)
  })

  it('get default', async function () {
    assert.equal(await get('foo'), 'bar')
  })

  it('get user config', async () => {
    assert.equal(await get('userkey'), 'uservalue')
  })

  it('set', function () {
    set('newkey1', 'newvalue1')
    set('newkey2', 'newvalue2')
    assert.equal(storageStub.set.callCount, 2)
  })
})
