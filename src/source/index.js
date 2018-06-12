const request = require('superagent')

module.exports = async (url) => {
  const response = await request.get(url)
  return response.text
}
