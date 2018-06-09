const assert = require('assert')
const request = require('superagent')
const mockSuperagent = require('superagent-mock')

describe('source', () => {
  let source
  let requestMock

  beforeEach(() => {
    source = require('../../../src/source')
  })

  afterEach(() => {
    if (requestMock !== undefined) {
      requestMock.unset()
    }
  })

  it('returns response body', async () => {
    requestMock = mockSuperagent(request, [{
      pattern: 'https://host/file.html',
      fixtures: (match, params, headers, context) => {
        return '<!doctype html>'
      },
      get: (match, data) => ({body: data})
    }])

    const result = await source('https://host/file.html')

    assert.strictEqual(result, '<!doctype html>')
  })
})
