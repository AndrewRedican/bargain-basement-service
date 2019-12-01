const { sameStructure, getType } = require('../../core')
const schema = require('./schema')

const productSchema = require('../products/schema')
productSchema.id = 0

const invalidProduct = product => !sameStructure(product, productSchema)

const invalidPackage = package => {
  if (!sameStructure(package, schema)) return true
  else {
    const productsT = getType(package.products)
    if (productsT === 'undefined') return false
    else if (productsT !== 'array') return true
    else return package.products.some(invalidProduct)
  }
}

module.exports = invalidPackage
