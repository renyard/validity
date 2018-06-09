module.exports = (results) => results.messages.map((item) => ({
  type: item.type,
  message: item.message,
  line: item.lastLine,
  column: item.lastColumn
}))
