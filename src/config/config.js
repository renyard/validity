const storage = require('./storage')

let defaults

const get = async (key) => {
  if (defaults === undefined) {
    defaults = require('./defaults.json')
  }

  let result = await storage.get(key)

  if (result === undefined) {
    return defaults[key]
  } else {
    return result
  }
}

const set = (key, value) => storage.set(key, value)

module.exports = {get, set}
