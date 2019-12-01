const HttpStatus = require('http-status-codes')
const { get, transaction, write } = require('../../databaseAccess')
const { getType, isIterable, sameType } = require('../../core')
const invalidPackage = require('./invalidPackage')
const schema = require('./schema')

exports.getAllPackages = async (req, res) => {
  let status, data, error
  try {
    data = (await get('packages')) || []
    status = HttpStatus.OK
  } catch (err) {
    error = err.message
    status = HttpStatus.INTERNAL_SERVER_ERROR
  }
  return res.status(status).json({
    data: { ...data, count: undefined },
    count: data.count,
    error
  })
}

exports.addPackages = async (req, res) => {
  let error
  try {
    if (req.body && !Array.isArray(req.body))
      throw new Error('_syntax:Expected list of packages.')

    if (req.body.some(invalidPackage))
      throw new Error('_syntax:Some packages do not match expected shape.')

    await transaction('packages', prevPackages => {
      const packages = { ...prevPackages }
      const prevCount = packages.count || 0
      const count = prevCount + req.body.length
      req.body.forEach((p, i) => {
        const id = prevCount + i + 1
        packages[id] = { ...p, id }
      })
      return { ...packages, count }
    })
    status = HttpStatus.CREATED
  } catch (err) {
    error = err.message.replace('_syntax:', '')
    status = err.message.includes('_syntax:')
      ? HttpStatus.BAD_REQUEST
      : HttpStatus.INTERNAL_SERVER_ERROR
  }
  return res.status(status).json({ error })
}

exports.getPackage = async (req, res) => {
  let status, data, error
  try {
    data = await get(`packages/${req.params.id}`)
    if (data !== null) status = HttpStatus.OK
    else {
      error = `Could not find package with id #${req.params.id}`
      status = HttpStatus.NOT_FOUND
    }
  } catch (err) {
    error = err.message
    status = HttpStatus.INTERNAL_SERVER_ERROR
  }
  return res.status(status).json({ data, error })
}

exports.editPackage = async (req, res) => {
  let data, error
  try {
    if (getType(req.body) !== 'object' || !isIterable(req.body))
      throw new Error(
        '_syntax:Expected on or more properties to modify from package.'
      )

    const editKeys = Object.keys(req.body)

    if (editKeys.some(key => !(key in schema)))
      throw new Error('_syntax:Some properties do not belong to a package.')

    if (editKeys.some(key => !sameType(req.body[key], schema[key])))
      throw new Error('_syntax:Some properties do not match value type.')

    data = await get(`packages/${req.params.id}`)
    if (data === null)
      throw new Error(`Could not find package with id #${req.params.id}`)

    write(`packages/${req.params.id}`, { ...data, ...req.body })
    status = HttpStatus.NO_CONTENT
  } catch (err) {
    error = err.message.replace('_syntax:', '')
    status = err.message.includes('_syntax:')
      ? HttpStatus.BAD_REQUEST
      : err.message.includes('Could not find')
      ? HttpStatus.NOT_FOUND
      : HttpStatus.INTERNAL_SERVER_ERROR
  }
  return res.status(status).json({ error })
}

exports.removePackage = async (req, res) => {
  let data, error
  try {
    data = await get(`packages/${req.params.id}`)
    if (data !== null) {
      await transaction('packages', prevPackages => {
        const packages = { ...prevPackages }
        const prevCount = packages.count || 0
        if (packages[req.params.id] === null)
          throw new Error(
            `Package with id #${req.params.id} has already been deleted.`
          )
        if (prevCount <= 0) throw new Error('There are no packages to delete.')
        return { ...packages, [req.params.id]: null, count: prevCount - 1 }
      })
      status = HttpStatus.NO_CONTENT
    } else {
      error = `Could not find package with id #${req.params.id}`
      status = HttpStatus.NOT_FOUND
    }
  } catch (err) {
    error = err.message
    status = err.message.includes('already been deleted')
      ? HttpStatus.GONE
      : HttpStatus.INTERNAL_SERVER_ERROR
  }
  return res.status(status).json({ error })
}
