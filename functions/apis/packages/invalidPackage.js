const { sameStructure, getType } = require('../../core')
const schema = require('./schema')

const invalidProduct = product =>
  !sameStructure(
    product,
    Object.assign({ id: 0 }, require('../products/schema'))
  )

const invalidPackage = package => {
  if (!sameStructure(package, schema)) return true
  else {
    const productsT = getType(package.products)
    if (productsT === 'undefined') return false
    else if (productsT !== 'object') return true
    else return Object.values(package.products).some(invalidProduct)
  }
}

module.exports = invalidPackage
