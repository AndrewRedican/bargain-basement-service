const HttpStatus = require('http-status-codes')
const { get, transaction } = require('../../databaseAccess')
const invalidProduct = require('./invalidProduct')

exports.getAllProducts = async (req, res) => {
  let status, data, error
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
  let error
  try {
    if (req.body && !Array.isArray(req.body))
      throw new Error('_syntax:Expected list of products.')

    if (req.body.some(invalidProduct))
      throw new Error('_syntax:Some products do not match expected shape.')

    await transaction('products', prevProducts => {
      const products = { ...prevProducts }
      const prevCount = products.count || 0
      const count = prevCount + req.body.length
      req.body.forEach((p, i) => {
        const id = prevCount + i + 1
        products[id] = { ...p, id }
      })
      return { ...products, count }
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

exports.getProduct = async (req, res) => {
  let status, data, error
  try {
    data = await get(`products/${req.params.id}`)
    if (data !== null) status = HttpStatus.OK
    else {
      error = `Could not find product with id #${req.params.id}`
      status = HttpStatus.NOT_FOUND
    }
  } catch (err) {
    error = err.message
    status = HttpStatus.INTERNAL_SERVER_ERROR
  }
  return res.status(status).json({ data, error })
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
