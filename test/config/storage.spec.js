import {assert} from 'chai'
import sinon from 'sinon'
import {default as storage, get, set} from '../../src/config/storage'

describe('storage', function () {
  let providerStub = {
    get: sinon.stub(),
    set: sinon.stub()
  }

  beforeEach(() => {
    storage.__set__('storage', providerStub)
  })

  afterEach(() => {
    storage.__ResetDependency__('chromium')
    storage.__set__('provider', undefined)
  })

  it('get on single call', function () {
    get('key')
    assert.isTrue(providerStub.get.calledWith('key'))
  })

  it('get on multiple calls', function () {
    get('key')
    assert.isTrue(providerStub.get.calledWith('key'))

    get('key2')
    assert.isTrue(providerStub.get.calledWith('key2'))
  })

  it('set on single call', function () {
    set('key', 'value')
    assert.isTrue(providerStub.set.calledWith('key', 'value'))
  })

  it('set on multiple calls', function () {
    set('key', 'value')
    assert.isTrue(providerStub.set.calledWith('key', 'value'))

    set('key2', 'value2')
    assert.isTrue(providerStub.set.calledWith('key', 'value'))
  })
})
