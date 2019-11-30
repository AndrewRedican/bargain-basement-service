const getType = require('./getType')

/**
 * Compares data type of two identities, returns dataType string if there is a match.
 * @param {*} identityA
 * @param {*} identityB
 * @return {boolean} true || false
 */
const sameType = (identityA, identityB) => {
  const typeA = getType(identityA)
  return typeA === getType(identityB) ? typeA : false
}

exports = module.exports = sameType
