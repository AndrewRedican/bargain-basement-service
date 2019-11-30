const router = require('express').Router()
const controller = require('./controller')

router.get('/', controller.getAllPackages)
router.post('/', controller.addPackages)
router.get('/:id', controller.getPackage)
router.patch('/:id', controller.editPackage)
router.delete('/:id', controller.removePackage)

module.exports = router
