import {default as config, get, set} from 'config'

describe('config', function () {
  let storageStub = {
    get: sinon.stub().returns({foo: 'bar'}),
    set: sinon.stub()
  }
  let initSpy = sinon.spy(config.__get__('init'))

  beforeEach(() => {
    config.__set__('storage', storageStub)
    config.__set__('init', initSpy)
    config.__set__('config', undefined)
  })

  afterEach(() => {
    config.__ResetDependency__('storage')
    config.__ResetDependency__('init')
  })

  it('default', function () {
    assert.isFunction(get)
  })

  it('get', function () {
    assert.equal(get('foo'), 'bar')
    assert.equal(get('foo'), 'bar')
    assert.equal(initSpy.callCount, 1)
  })

  it('set', function () {
    set('key', 'value')
    set('key', 'value')
    assert.equal(storageStub.set.callCount, 2)
    assert.equal(config.__get__('config').key, 'value')
  })
})
