const sameStructure = require('./sameStructure')

/**
 * Compares two identities, will return either true if identical, otherwise false.
 * Order of properties does not matter.
 * @param {*} identityA
 * @param {*} identityB
 * @return {boolean} true || false
 */
const identical = (identityA, identityB) => {
  const structureMatch = sameStructure(identityA, identityB)
  if (structureMatch === false) return structureMatch
  if (['array', 'object'].indexOf(structureMatch) === -1)
    return identityA === identityB
  const Keys = Object.keys(identityA),
    KeyCount = Keys.length
  var childMatch = true
  for (var i = 0; i < KeyCount; i++) {
    const Key = Keys[i],
      identicalMatch = identical(identityA[Key], identityB[Key])
    if (identicalMatch === false) {
      childMatch = identicalMatch
      break
    }
  }
  return childMatch
}

exports = module.exports = identical
