module.exports = (results) => results.map((item) => ({
  type: item.type,
  message: item.message,
  line: item.lastLine,
  column: item.lastColumn
}))
