const ERRORS = require('./constants.json')

module.exports = (err) => {
  const errors = Object.values(ERRORS)

  if (errors.includes(err.message)) {
    // Report error
  } else {
    throw err
  }
}
