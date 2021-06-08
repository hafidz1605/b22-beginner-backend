const route = require('express').Router()

const itemController = require('../controllers/items')
route.get('/', itemController.getItems)
route.post('/', itemController.createItem)
route.patch('/:id', itemController.patchItem)
route.put('/:id', itemController.updateItem)
route.delete('/:id', itemController.deleteItem)
route.get('/:id', itemController.getDetail)

module.exports = route
