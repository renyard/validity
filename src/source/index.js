const request = require('superagent')

module.exports = async (url) => {
  const { body } = await request(url)
  return body
}
