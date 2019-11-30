const sameType = require('./sameType')
const trim = require('./trim')
const isIterable = require('./isIterable')
const containsKeys = require('./containsKeys')
const identical = require('./identical')

/**
 * Performs deep search on collection to find a match to the identity, will return the path of the first instance matched as string. If no matches found, returns `false`.
 * @param {*} collection
 * @param {*} identity
 * @param {Optional number} maxDepth
 * @return {(string\|boolean)} path
 */
const locate = (collection, identity, maxDepth = null) => {
  function _locate(collection, identity, path = '', maxDepth, currentDepth) {
    if (isIterable(identity))
      if (sameType(collection, identity))
        if (containsKeys(collection, Object.keys(identity))) {
          const trimmed = trim(collection, Object.keys(identity))
          if (identical(trimmed, identity)) return path
        }
    if (identical(collection, identity)) return path
    var result = false
    if (maxDepth !== null) if (currentDepth >= maxDepth) return result

    if (isIterable(collection))
      for (
        var i = 0, keys = Object.keys(collection), l = keys.length;
        i < l;
        i++
      ) {
        const key = keys[i],
          subcollection = collection[key],
          res = _locate(
            subcollection,
            identity,
            key,
            maxDepth,
            currentDepth + 1
          )
        if (res) {
          path = path === '' ? path : path + '.'
          result = path + res
          break
        }
      }
    return result
  }
  return _locate(collection, identity, '', maxDepth, 0)
}

exports = module.exports = locate
