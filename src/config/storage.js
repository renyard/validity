const storage = require('./provider/chromiumStorage')

let provider

function init () {
  if (provider === undefined) {
    provider = storage
  }
}

const get = (key) => {
  init()

  return provider.get(key)
}

const set = (key, value) => {
  init()

  return provider.set(key, value)
}

module.exports = {get, set}
