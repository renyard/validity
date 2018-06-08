const request = require('superagent')
const config = require('../../config')
const transform = require('./transform')

module.exports = async function (htmlFile) {
  let results
  let validatorUrl = await config.get('validatorUrl')
  let formData = new FormData()

  formData.append('file', htmlFile)

  try {
    let {body} = await request('POST', validatorUrl, {}, formData)
    results = JSON.parse(body)
    results = transform(results)
  } catch (e) {
    throw e
  }

  return results
}
