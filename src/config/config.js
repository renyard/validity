import storage from './storage'
import request from 'superagent'

let defaults

export async function get (key) {
  if (defaults === undefined) {
    let configs = await request('GET', '../../config.json')
    defaults = JSON.parse(configs)
  }

  let result = await storage.get(key)

  if (result === undefined) {
    return defaults[key]
  } else {
    return result
  }
}

export async function set (key, value) {
  storage.set(defaults)
}
