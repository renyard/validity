const request = require('superagent')
const config = require('../../config')
const transform = require('./transform')
const ERRORS = require('../../error/constants.json')

module.exports = async function (htmlFile) {
  let results
  let validatorUrl = await config.get('validatorUrl')
  let formData = new FormData()

  formData.append('file', htmlFile)

  try {
    let { text } = await request.post(`${validatorUrl}?out=json`)
      .set('Content-type', 'text/html')
      .send(htmlFile)

    const { messages } = JSON.parse(text)
    results = transform(messages)
  } catch (e) {
    throw new Error(ERRORS.VALIDATOR_ERROR)
  }

  return results
}
