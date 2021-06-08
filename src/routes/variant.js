const route = require('express').Router()

const variantController = require('../controllers/variant')
route.get('/', variantController.getVariant)
route.post('/', variantController.createVariant)
route.put('/:id', variantController.updateVariant)
route.delete('/:id', variantController.deleteVariant)

module.exports = route
