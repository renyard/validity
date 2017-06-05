import request from '../../src/util/request'

describe('request', function () {
  let xhrMock
  let xhrSetRequestHeaderMock
  let requests = []

  beforeEach(function () {
    xhrMock = sinon.useFakeXMLHttpRequest()
    xhrMock.onCreate = (xhr) => {
      xhrSetRequestHeaderMock = xhr.setRequestHeader = sinon.stub()
      requests.push(xhr)
    }
  })

  afterEach(function () {
    xhrMock.restore()
    xhrSetRequestHeaderMock = undefined
    requests = []
  })

  it('returns a promise', function (done) {
    request('http://test/url')
      .then(() => done())
      .catch(() => {
        assert.fail()
        done()
      })

    requests[0].respond(200, {})
  })

  it('returns the request body', function (done) {
    request('http://test/url')
      .then((body) => {
        assert.isString(body)
        assert.equal(body, '<!doctype html>')
        done()
      })

    requests[0].respond(200, {'Content-Type': 'text/html'}, '<!doctype html>')
  })

  it('sends form data', function () {
    let payload = new FormData()

    request('http://test/url', 'POST', {}, payload)
      .then(() => {
        assert.isTrue(xhrMock.send.called)
        assert.isTrue(xhrMock.send.calledWith(payload))
        assert.isFalse(xhrSetRequestHeaderMock.called)
      })
  })

  it('sets request headers', function () {
    let headers = {
      'Content-Type': 'text/html'
    }

    request('http://test/url', 'POST', headers)

    assert.isTrue(xhrSetRequestHeaderMock.calledWith(
      'Content-Type',
      'text/html'
    ))
  })

  it('catches error on non 2xx response', function (done) {
    request('http://test/url')
      .then(() => {
        assert.fail()
        done()
      })
      .catch((status, statusText) => {
        assert.equal(status, 400)
        done()
      })

    requests[0].respond(400, {'Content-Type': 'text/html'}, '<!doctype html>')
  })

  it('catches thrown error', function (done) {
    request('http://test/url')
      .then(() => {
        assert.fail()
        done()
      })
      .catch((status, statusText) => {
        assert.equal(status, 0)
        done()
      })

    requests[0].error()
  })
})
