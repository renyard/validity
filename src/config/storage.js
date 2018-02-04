import storage from './provider/chromiumStorage'

let provider

function init () {
  if (provider === undefined) {
    provider = storage
  }
}

export function get (key) {
  init()

  return provider.get(key)
}

export function set (key, value) {
  init()

  return provider.set(key, value)
}

export default {get, set}
