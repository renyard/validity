import storage from './storage'

let config

function init () {
  config = storage.get()
}

export function get (key) {
  if (config === undefined) {
    init()
  }

  return config[key]
}

export function set (key, value) {
  if (config === undefined) {
    init()
  }

  config[key] = value

  storage.set(config)
}
