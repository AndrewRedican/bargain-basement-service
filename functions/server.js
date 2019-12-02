const express = require('express')
const cors = require('cors')
const app = express()
const basicAuth = require('express-basic-auth')

app
  .use(cors())
  .use(
    basicAuth({
      users: { admin: 'supersecret' }
    })
  )
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use('/products', require('./apis/products/route'))
  .use('/packages', require('./apis/packages/route'))
  .get('*', (_, res) => res.status(404).json({ data: 'Endpoint not found' }))

module.exports = app
