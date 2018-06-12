const { browserAction } = require('./util/browser')()
const app = require('./app')

browserAction.onClicked.addListener(app)
