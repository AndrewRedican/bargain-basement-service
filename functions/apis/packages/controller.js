const HttpStatus = require('http-status-codes')
const { get } = require('../../databaseAccess')

exports.getAllPackages = async (req, res) => {
  let status, data, success, error
  try {
    data = (await get('packages')) || []
    success = true
    status = HttpStatus.OK
  } catch (err) {
    error = err.message
    success = false
    status = HttpStatus.INTERNAL_SERVER_ERROR
  }
  return res.status(status).json({
    data: { ...data, count: undefined },
    count: data.count,
    success,
    error
  })
}

exports.addPackages = (req, res) => {
  // todo, nothing found return empty array
  return res.status(200).json({
    // 200 or 204 depending if full details or not
    success: true,
    data: {
      process: 'addPackages'
    }
  })
}

exports.getPackage = async (req, res) => {
  let status
  const body = {}
  try {
    const data = await get(`packages/${req.params.id}`)
    if (data !== null) {
      body.data = data
      body.success = true
      status = HttpStatus.OK
    } else {
      body.error = `Could not find package with id #${req.params.id}`
      body.success = false
      status = HttpStatus.NOT_FOUND
    }
  } catch (err) {
    body.success = false
    body.error = err.message
    status = HttpStatus.INTERNAL_SERVER_ERROR
  }
  return res.status(status).json(body)
}

exports.editPackage = (req, res) => {
  // todo...
  const exists = true
  return res.status(exists ? 200 : 404).json({
    success: true,
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
    success: true,
    data: {
      process: 'removePackage',
      targetId: req.params.id
    }
  })
}
