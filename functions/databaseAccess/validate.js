const err = require('../core/err')

/**
 * Function designed to validate firebase database request params
 * @param {string} path
 * @param {any} data
 */
const validate = {
  eval: (...args) => {
    if (args.length < 2)
      throw Error('@validate(): Expected to contain at least one argument')
    const requestType = args[0]
    err.stackRef(4)
    err.setCaller(`apis/firebase/client.${requestType}`)

    if (requestType === 'atomicUpdate.commit')
      err.isNotType('data', args[1], 'object')
    else err.isInvalidPath('path', args[1])

    if (args.length === 3) err.isInvalidWriteData('data', args[2])
    err.setCaller()
    err.stackRef()
  },

  write: (...args) => validate.eval('write', ...args),

  remove: (...args) => validate.eval('remove', ...args),

  get: (...args) => validate.eval('get', ...args),

  atomicUpdate: {
    write: (...args) => validate.eval('atomicUpdate.write', ...args),
    remove: (...args) => validate.eval('atomicUpdate.remove', ...args),
    commit: (...args) => validate.eval('atomicUpdate.commit', ...args)
  }
}

exports = module.exports = validate
