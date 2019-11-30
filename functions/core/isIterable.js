const getType = require('./getType')

/**
 * Check if identity has one or more keys to iterate
 * @param {*} identity
 * @return {boolean} true || false
 */
const isIterable = identity => {
  if (['array', 'object'].indexOf(getType(identity)) === -1) return false
  if (Object.keys(identity).length === 0) return false
  return true
}

exports = module.exports = isIterable
