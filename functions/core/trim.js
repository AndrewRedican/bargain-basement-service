const getType = require('./getType')

/**
 * Trims an identity to only contain the specified properties.
 * @param {*} identity
 * @param {*} keyList
 * @return {Object or Array} Returns , otherwise false
 */
const trim = (identity, keyList) => {
  const identityType = getType(identity)
  if (['array', 'object'].indexOf(identityType) === -1) return undefined
  const keyCount = keyList.length
  if (keyCount === 0) return undefined
  var newIdentity
  switch (identityType) {
    case 'object':
      newIdentity = {}
      keyList.forEach(key => {
        if (key in identity) newIdentity[key] = identity[key]
      })
      break
    case 'array':
      newIdentity = []
      keyList.forEach(key => {
        if (key in identity) newIdentity.push(identity[key])
      })
      break
    default:
  }
  return newIdentity
}

exports = module.exports = trim
