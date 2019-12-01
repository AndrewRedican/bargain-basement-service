const HttpStatus = require('http-status-codes')
const { get, transaction, write } = require('../../databaseAccess')
const { getType, isIterable, sameType } = require('../../core')
const invalidProduct = require('./invalidProduct')
const schema = require('./schema')

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
    if (!isIterable(req.body))
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

exports.editProduct = async (req, res) => {
  let data, error
  try {
    if (getType(req.body) !== 'object' || !isIterable(req.body))
      throw new Error(
        '_syntax:Expected on or more properties to modify from product.'
      )

    const editKeys = Object.keys(req.body)

    if (editKeys.some(key => !(key in schema)))
      throw new Error('_syntax:Some properties do not belong to a product.')

    if (editKeys.some(key => !sameType(req.body[key], schema[key])))
      throw new Error('_syntax:Some properties do not match value type.')

    data = await get(`products/${req.params.id}`)
    if (data === null)
      throw new Error(`Could not find product with id #${req.params.id}`)

    write(`products/${req.params.id}`, { ...data, ...req.body })
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
