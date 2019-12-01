const HttpStatus = require('http-status-codes')
const { get, insert } = require('../../databaseAccess')

exports.getAllProducts = async (req, res) => {
  let status, data, success, error
  try {
    data = (await get('products')) || []
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

exports.addProducts = async (req, res) => {
  let status
  const body = {}
  try {
    insert('products', req.body)
    body.success = true
    status = HttpStatus.CREATED
  } catch (err) {
    body.success = false
    body.error = err.message
    status = HttpStatus.INTERNAL_SERVER_ERROR
  }
  return res.status(status).json(body)
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
