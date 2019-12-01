const HttpStatus = require('http-status-codes')
const { get, transaction } = require('../../databaseAccess')
const invalidPackage = require('./invalidPackage')

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

exports.editPackage = (req, res) => {
  // todo...
  const exists = true
  return res.status(exists ? 200 : 404).json({
    data: {
      process: 'editPackage',
      targetId: req.params.id
    }
  })
}

exports.removePackage = (req, res) => {
  // todo...
  const existed = true
  return res.status(existed ? 204 : 404).json({
    data: {
      process: 'removePackage',
      targetId: req.params.id
    }
  })
}
