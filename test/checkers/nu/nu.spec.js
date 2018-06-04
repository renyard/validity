const assert = require('assert')
const td = require('testdouble')
const FormData = require('form-data')
const request = require('superagent')
const mockSuperagent = require('superagent-mock')

describe('nu', function () {
  describe('api', function () {
    let nu
    let xhr
    let configMock
    let requestMock

    beforeEach(() => {
      global.FormData = FormData
      configMock = td.replace('../../../src/config/config')

      td.when(configMock.get('validatorUrl')).thenResolve('https://validator/url')

      requestMock = mockSuperagent(request, [{
        pattern: 'https://validator/url',
        fixtures: (match, params, headers, context) => {
          return '{}'
        },
        post: (match, data) => ({body: data})
      }])

      nu = require('../../../src/checkers/nu/nu.js')
    })

    afterEach(() => {
      delete global.FormData
      requestMock.unset()
    })

    it('exports a function', () => {
      assert(typeof nu === 'function')
    })

    it('calls request with URL and form data', async () => {
      const file = Buffer.from([''])
      const results = await nu(file)
    })
  })
})
