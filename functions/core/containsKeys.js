const isIterable = require('./isIterable')

/**
 * Check if identity contains all of the specified keys
 * @param {*} identity
 * @param {Array} keyList
 * @return {boolean} true || false
 */
const containsKeys = (identity, keyList) => {
  const keyCount = keyList.length
  if (keyCount === 0 || !isIterable(identity)) return false
  const identitykeys = Object.keys(identity)
  var result = true
  for (var i = 0; i < keyCount; i++) {
    const key = '' + keyList[i]
    if (identitykeys.indexOf(key) === -1) {
      result = false
      break
    }
  }
  return result
}

exports = module.exports = containsKeys
