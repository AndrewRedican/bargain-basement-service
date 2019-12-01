const HttpStatus = require('http-status-codes')
const { get } = require('../../databaseAccess')

exports.getAllProducts = async (req, res) => {
  let status
  const body = {}
  try {
    body.data = (await get('products')) || []
    body.success = true
    status = HttpStatus.OK
  } catch (err) {
    body.error = err.message
    body.success = false
    status = HttpStatus.INTERNAL_SERVER_ERROR
  }
  return res.status(status).json(body)
}

exports.addProducts = (req, res) => {
  // todo, nothing found return empty array
  return res.status(200).json({
    // 200 or 204 depending if full details or not
    success: true,
    data: {
      process: 'addProducts'
    }
  })
}

exports.getProduct = async (req, res) => {
  let status
  const body = {}
  try {
    const data = await get(`products/${req.params.id}`)
    if (data !== null) {
      body.data = data
      body.success = true
      status = HttpStatus.OK
    } else {
      body.error = `Could not find product with id #${req.params.id}`
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

exports.editProduct = (req, res) => {
  // todo...
  const exists = true
  return res.status(exists ? 200 : 404).json({
    success: true,
    data: {
      process: 'editProduct',
      targetId: req.params.id
    }
  })
}
