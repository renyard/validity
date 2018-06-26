const assert = require('assert')
const td = require('testdouble')
const FormData = require('form-data')
const request = require('superagent')
const mockSuperagent = require('superagent-mock')

const assertThrowsAsync = async (func, args, expectedMessage) => {
  try {
    await func(...args)
    assert.fail('Did not throw')
  } catch (e) {
    assert(e.message, expectedMessage)
  }
}

describe('checkers/nu', function () {
  let nu
  let requestMock
  let configMock
  let transformMock

  beforeEach(() => {
    global.FormData = FormData
    configMock = td.replace('../../../../src/config')
    transformMock = td.replace('../../../../src/checkers/nu/transform')

    td.when(configMock.get('validatorUrl')).thenResolve('https://validator/url')
    td.when(transformMock([])).thenReturn([])

    nu = require('../../../../src/checkers/nu')
  })

  afterEach(() => {
    td.reset()
    delete global.FormData
    if (requestMock !== undefined) {
      requestMock.unset()
    }
  })

  it('exports a function', () => {
    assert(typeof nu === 'function')
  })

  it('calls request with URL and form data', async () => {
    requestMock = mockSuperagent(request, [{
      pattern: 'https://validator/url',
      fixtures: () => '{"messages": []}',
      post: (match, data) => ({text: data})
    }])

    const file = Buffer.from([''])
    const results = await nu(file)

    assert.deepEqual(results, {})
  })

  it('throws on failed request', async () => {
    requestMock = mockSuperagent(request, [{
      pattern: 'https://validator/url',
      fixtures: () => {
        throw new Error(500)
      }
    }])

    const file = Buffer.from([''])
    await assertThrowsAsync(nu, [file], 'validator_error')
  })
})
