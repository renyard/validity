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
      get: (match, data) => ({text: data})
    }])

    const result = await source('https://host/file.html')

    assert.strictEqual(result, '<!doctype html>')
  })

  it('returns source for a 404 response', async () => {
    requestMock = mockSuperagent(request, [{
      pattern: 'https://host/404.html',
      fixtures: (match, params, headers, context) => {
        let error = new Error()
        error.status = 404
        error.response = '<!doctype html>'

        throw error
      }
    }])

    let result

    try {
      result = await source('https://host/404.html')
    } catch (err) {
      assert.fail('Error thrown')
    }

    assert.strictEqual(result, '<!doctype html>')
  })

  it('returns source for an 500 response', async () => {
    requestMock = mockSuperagent(request, [{
      pattern: 'https://host/500.html',
      fixtures: (match, params, headers, context) => {
        let error = new Error()
        error.status = 500
        error.response = '<!doctype html>'

        throw error
      }
    }])

    let result

    try {
      result = await source('https://host/500.html')
    } catch (err) {
      assert.fail('Error thrown')
    }

    assert.strictEqual(result, '<!doctype html>')
  })

  it('throws error on network error', async () => {
    requestMock = mockSuperagent(request, [{
      pattern: 'https://networkError',
      fixtures: (match, params, headers, context) => {
        let error = new Error()
        error.status = undefined
        throw error
      }
    }])

    try {
      await source('https://networkError')
      assert.fail('No error thrown')
    } catch (err) {
      assert.equal(err.message, 'source_error')
    }
  })
})
