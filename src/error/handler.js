const { i18n } = require('../util/browser')()
const ERRORS = require('./constants.json')

module.exports = (err) => {
  const errors = Object.values(ERRORS)

  if (errors.includes(err.message)) {
    const i18nKey = err.message.toUpperCase()

    return [[{
      type: 'network',
      message: i18n.getMessage(`ERR_${i18nKey}`)
    }]]
  } else {
    throw err
  }
}
