const getType = require('./getType')
const locate = require('./locate')

const err = {
  stackRef: (skip = 2) => {
    err.stackReference = skip
    return err
  },

  setCaller: caller => {
    err.caller = caller
    return err
  },

  getCaller: () => {
    const stackTrace = new Error().stack
    var callerName = stackTrace.replace(/^Error\s+/, '')
    callerName = callerName.split('\n')[err.stackReference || 2]
    callerName = err.caller || callerName
    callerName = callerName
      .replace(/^\s+at Object./, '')
      .replace(/^\s+at /, '')
      .replace(/ \(.+\)$/, '')
    return callerName
  },

  throwError: (
    fxName = 'unknown function',
    paramName = 'unknown parameter',
    expectation = 'to be defined'
  ) => {
    err.stackRef()
    err.setCaller()
    throw [
      '@',
      fxName,
      "(): Expected parameter '",
      paramName,
      "' ",
      expectation
    ].join('')
  },

  isUndefined: (paramName = '<unknown parameter>', param) => {
    if ([null, undefined].indexOf(param) > -1)
      err.throwError(err.getCaller(), paramName)
    return err
  },

  isFalsy: (paramName = '<unknown parameter>', param) => {
    if (!param) err.throwError(err.getCaller(), paramName)
    return err
  },

  isNoneOf: (paramName = '<unknown parameter>', param, contains = []) => {
    if (contains.indexOf(param) === -1)
      err.throwError(
        err.getCaller(),
        paramName,
        `to be any of ${JSON.stringify(contains)}`
      )
    return err
  },

  isAnyOf: (paramName = '<unknown parameter>', param, contains = []) => {
    if (contains.indexOf(param) > -1)
      err.throwError(
        err.getCaller(),
        paramName,
        `not to be any of ${JSON.stringify(contains)}`
      )
    return err
  },

  isNotType: (paramName = '<unknown parameter>', param, type = '') => {
    if (getType(param) !== type.toLowerCase())
      err.throwError(
        err.getCaller(),
        paramName,
        `to be type of ${type.toLowerCase()}`
      )
    return err
  },

  isAnyTypeOf: (paramName = '<unknown parameter>', param, types = []) => {
    types.forEach(type => {
      if (getType(param) === type)
        err.throwError(
          err.getCaller(),
          paramName,
          `not to be type of ${type.toLowerCase()}`
        )
    })
    return err
  },

  missingKey: (paramName = '<unknown parameter>', param, keyName = '') => {
    err.isUndefined(paramName, param)
    if (Object.keys(param).indexOf(keyName) === -1)
      err.throwError(err.getCaller(), paramName, `to contain '${keyName}' key`)
    return err
  },

  missingAnyKeys: (
    paramName = '<unknown parameter>',
    param,
    keyNames = ['']
  ) => {
    err.isUndefined(paramName, param)
    const keyList = Object.keys(param)
    keyNames.forEach(keyName => {
      if (keyList.indexOf(keyName) === -1)
        err.throwError(
          err.getCaller(),
          paramName,
          `to contain '${keyName}' key`
        )
    })
    return err
  },

  containsUndefined: (paramName = '<unknown parameter>', param) => {
    ;[undefined, null].forEach(value => {
      const location = locate(param, value)
      if (location)
        err.throwError(
          err.getCaller(),
          paramName,
          `not to contain '${JSON.stringify(value)}' at ${location}`
        )
    })
    return err
  },

  isInvalidPath: (paramName = '<unknown parameter>', param) => {
    err.isUndefined(paramName, param)
    err.isNotType(paramName, param, 'string')
    err.isAnyOf(paramName, param, ['', '/'])
    '.$[]#'.split().forEach(invalidChar => {
      if (param.indexOf(invalidChar) > -1)
        err.throwError(
          err.getCaller(),
          paramName,
          `not to contain invalid character '${invalidChar}'`
        )
    })
    if (param.match(/\/{2,}/g))
      err.throwError(
        err.getCaller(),
        paramName,
        'not to contain consecutive forward slash characters'
      )
    return err
  },

  isInvalidWriteData: (paramName = '<unknown parameter>', param) => {
    err.isUndefined(paramName, param)
    err.containsUndefined(paramName, param)
    return err
  }
}

exports = module.exports = err
