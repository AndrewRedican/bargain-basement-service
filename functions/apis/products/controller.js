const HttpStatus = require('http-status-codes')
const { get, insert } = require('../../databaseAccess')

exports.getAllProducts = async (req, res) => {
  let status, data, success, error
  try {
    data = (await get('products')) || []
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

exports.addProducts = async (req, res) => {
  let status
  const body = {}
  try {
    insert('products', req.body)
    status = HttpStatus.CREATED
  } catch (err) {
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
      status = HttpStatus.OK
    } else {
      body.error = `Could not find product with id #${req.params.id}`
      status = HttpStatus.NOT_FOUND
    }
  } catch (err) {
    body.error = err.message
    status = HttpStatus.INTERNAL_SERVER_ERROR
  }
  return res.status(status).json(body)
}

exports.editProduct = (req, res) => {
  // todo...
  const exists = true
  return res.status(exists ? 200 : 404).json({
    data: {
      process: 'editProduct',
      targetId: req.params.id
    }
  })
}
