/**
 * Function determines type of value/data and returns a custom string representation of the type
 * @param {*} it identity - Any identity
 * @param {object} [advancedSettings={}] - Optional settings
 * @returns {string} The corresponding data type
 */
const getType = (it, advancedSettings = {}) => {
  if (it === null) return 'null'

  const preliminaryType = typeof it

  if (advancedSettings.truthy && it) return 'truthy'
  if (advancedSettings.falsy && !it) return 'falsy'
  if (advancedSettings.emptyString && preliminaryType === 'string' && it === '')
    return 'emptyString'

  if (preliminaryType === 'number') {
    if (`${it}` === 'NaN') return 'NaN'
    if (advancedSettings.finiteness)
      return it === Infinity ? 'infinity' : 'finite'

    if (advancedSettings.positive && it > 0) return 'positive'
    if (advancedSettings.negative && it < 0) return 'negative'
    if (advancedSettings.zero && it === 0) return 'zero'
  }

  // covers the following value types: string, boolean, undefined, number, symbol, function, bigint
  if (preliminaryType !== 'object') return preliminaryType

  if (it instanceof Array) return 'array'
  if (it instanceof Date) return 'date'
  if (it instanceof Set) return 'set'
  if (it instanceof RegExp) return 'regExp'
  if (it instanceof Promise) return 'promise'

  try {
    if (advancedSettings.specialArrays) {
      if (it instanceof DataView) return 'dataView'
      if (it instanceof ArrayBuffer) return 'arrayBuffer'
      if (it instanceof Int8Array) return 'int8Array'
      if (it instanceof Int16Array) return 'int16Array'
      if (it instanceof Int32Array) return 'int32Array'
      if (it instanceof Uint8Array) return 'uInt8Array'
      if (it instanceof Uint16Array) return 'uInt16Array'
      if (it instanceof Uint32Array) return 'uInt32Array'
      if (it instanceof Float32Array) return 'float32Array'
      if (it instanceof Float64Array) return 'float64Array'
      if (it instanceof Uint8ClampedArray) return 'uInt8ClampedArray'
    } else {
      if (it instanceof DataView) return 'specialArray'
      if (it instanceof ArrayBuffer) return 'specialArray'
      if (it instanceof Int8Array) return 'specialArray'
      if (it instanceof Int16Array) return 'specialArray'
      if (it instanceof Int32Array) return 'specialArray'
      if (it instanceof Uint8Array) return 'specialArray'
      if (it instanceof Uint16Array) return 'specialArray'
      if (it instanceof Uint32Array) return 'specialArray'
      if (it instanceof Float32Array) return 'specialArray'
      if (it instanceof Float64Array) return 'specialArray'
      if (it instanceof Uint8ClampedArray) return 'specialArray'
    }

    if (advancedSettings.errorTypes) {
      if (it instanceof EvalError) return 'evalError'
      if (it instanceof RangeError) return 'rangeError'
      if (it instanceof ReferenceError) return 'referenceError'
      if (it instanceof SyntaxError) return 'syntaxError'
      if (it instanceof TypeError) return 'typeError'
      if (it instanceof URIError) return 'uriError'
    }
    if (it instanceof Error) return 'error'

    if (advancedSettings.intl) {
      if (it instanceof Intl.Collator) return 'intl.collator'
      if (it instanceof Intl.DateTimeFormat) return 'intl.dateTimeFormat'
      if (it instanceof Intl.ListFormat) return 'intl.listFormat'
      if (it instanceof Intl.Locale) return 'intl.locale'
      if (it instanceof Intl.NumberFormat) return 'intl.numberFormat'
      if (it instanceof Intl.PluralRules) return 'intl.PluralRules'
      if (it instanceof Intl.RelativeTimeFormat)
        return 'intl.relativeTimeFormat'
    } else {
      if (it instanceof Intl.Collator) return 'intl'
      if (it instanceof Intl.DateTimeFormat) return 'intl'
      if (it instanceof Intl.ListFormat) return 'intl'
      if (it instanceof Intl.Locale) return 'intl'
      if (it instanceof Intl.NumberFormat) return 'intl'
      if (it instanceof Intl.PluralRules) return 'intl'
      if (it instanceof Intl.RelativeTimeFormat) return 'intl'
    }
    if (it === Intl) return 'intl'

    if (`${it}` === '[object JSON]') return 'json'
    if (`${it}` === '[object Math]') return 'math'

    if (it instanceof Boolean) return '!boolean'
    if (it instanceof String) return '!string'

    if (it instanceof WeakMap) return 'weakMap'
    if (it instanceof WeakSet) return 'weakSet'
    if (it instanceof Map) return 'map'
  } catch (error) {
    return 'object'
  }

  return 'object'
}

exports = module.exports = getType
