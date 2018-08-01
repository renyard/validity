const td = require('testdouble')

describe('index', () => {
  let browserStub
  let appStub
  let actionsStub

  beforeEach(() => {
    browserStub = {
      browserAction: {
        onClicked: {
          addListener: td.func()
        }
      },
      tabs: {
        onUpdated: {
          addListener: td.func()
        },
        onCreated: {
          addListener: (listener) => listener({id: 1})
        }
      }
    }
    appStub = td.replace('../../src/app', async () => {})
    td.replace('../../src/util/browser', () => browserStub)
    actionsStub = td.replace('../../src/util/actions', td.func())
    require('../../src/index')
  })

  afterEach(() => {
    td.reset()
  })

  it('sets listeners', () => {
    td.verify(browserStub.browserAction.onClicked.addListener(appStub))
    td.verify(browserStub.tabs.onUpdated.addListener(actionsStub))
    td.verify(actionsStub(1, null, {id: 1}))
  })
})
