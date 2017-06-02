import request from '../../src/util/request'

describe('request', function () {
  let xhrMock
  let requests = []

  beforeEach(function () {
    xhrMock = sinon.useFakeXMLHttpRequest()
    xhrMock.onCreate = (xhr) => {
      requests.push(xhr)
    }
  })

  afterEach(function () {
    xhrMock.restore()
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
    let formData = new FormData()

    request('http://test/url', 'POST', formData)
      .then(() => {
        assert.isTrue(xhrMock.send.called)
        assert.isTrue(xhrMock.send.calledWith(formData))
      })
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
