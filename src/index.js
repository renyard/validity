const { browserAction, tabs } = require('./util/browser')()
const app = require('./app')
const setBrowserAction = require('./util/actions')

browserAction.onClicked.addListener(app)

tabs.onUpdated.addListener(setBrowserAction)

tabs.onCreated.addListener((tab) => setBrowserAction(tab.id, null, tab))
