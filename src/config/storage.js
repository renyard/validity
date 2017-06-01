import storage from './provider/chromiumStorage'

let provider

function init () {
  provider = storage
}

export function get (key) {
  if (provider === undefined) {
    init()
  }

  return provider.get(key)
}
export function set (key, value) {
  if (provider === undefined) {
    init()
  }

  return provider.set(key, value)
}
