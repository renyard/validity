const checkers = require('./checkers')

module.exports = async (file) => {
  const results = await checkers(file)
  return results
}
