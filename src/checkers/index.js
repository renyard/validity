const nu = require('./nu')

module.exports = async (file) => Promise.all([nu(file)])
