const request = require('superagent')
const ERRORS = require('../error/constants.json')

module.exports = async (url) => {
  let text

  try {
    const response = await request.get(url)
    text = response.text
  } catch (err) {
    if (err.response) {
      text = err.response
    } else {
      throw new Error(ERRORS.SOURCE_ERROR)
    }
  }

  return text
}
