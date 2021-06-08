const route = require('express').Router()

const categoryController = require('../controllers/category')
route.get('/', categoryController.getCategory)
route.post('/', categoryController.createCategory)
route.put('/:id', categoryController.updateCategory)
route.delete('/:id', categoryController.deleteCategory)
module.exports = route
