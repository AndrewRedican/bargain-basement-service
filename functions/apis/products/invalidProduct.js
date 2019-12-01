const { sameStructure } = require('../../core')
const schema = require('./schema')

const invalidProduct = product => !sameStructure(product, schema)

module.exports = invalidProduct
