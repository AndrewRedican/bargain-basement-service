const router = require('express').Router()
const controller = require('./controller')

router.get('/', controller.getAllProducts)
router.post('/', controller.addProducts)
router.get('/:id', controller.getProduct)
router.patch('/:id', controller.editProduct)

module.exports = router
