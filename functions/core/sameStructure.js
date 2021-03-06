const sameType = require('./sameType')

/**
 * Compares data structure of two identities, will return either the dataType or true/false.
 * For objects, order of keys do not matter.
 * @param {*} identityA
 * @param {*} identityB
 * @return {(string\|boolean)} DataType as string for positive match, otherwise false
 */
const sameStructure = (identityA, identityB) => {
  const typeMatch = sameType(identityA, identityB)
  if (typeMatch === false) return false
  if (['array', 'object'].includes(typeMatch)) {
    const AKeys = Object.keys(identityA),
      BKeys = Object.keys(identityB),
      AKeyCount = AKeys.length,
      BKeyCount = BKeys.length
    if (!(AKeyCount === BKeyCount)) return false
    if (AKeyCount === 0) return typeMatch
    for (var i = 0; i < AKeyCount; i++) {
      if ('array' === typeMatch) if (AKeys[i] !== BKeys[i]) return false
      if (!BKeys.includes(AKeys[i])) return false
      if (!AKeys.includes(BKeys[i])) return false
      if (!sameType(identityA[AKeys[i]], identityB[AKeys[i]])) return false
    }
  }
  return typeMatch
}

exports = module.exports = sameStructure
