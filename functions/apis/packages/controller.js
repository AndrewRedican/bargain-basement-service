const HttpStatus = require('http-status-codes')
const { get } = require('../../databaseAccess')

exports.getAllPackages = async (req, res) => {
  let status
  const body = {}
  try {
    body.data = (await get('packages')) || []
    body.success = true
    status = HttpStatus.OK
  } catch (err) {
    body.success = false
    body.status = HttpStatus.INTERNAL_SERVER_ERROR
    error = err.message
  }
  return res.status(status).json(body)
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

exports.getPackage = (req, res) => {
  // todo...
  const exists = true
  return res.status(exists ? 200 : 404).json({
    success: true,
    data: {
      process: 'getPackage',
      targetId: req.params.id
    }
  })
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
