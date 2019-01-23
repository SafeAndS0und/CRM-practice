const express = require('express')
const Router = express.Router()
const checkAuth = require('../middlewares/check-auth')

const productController = require('../controllers/product')

Router.post('/', checkAuth, productController.product_add)
Router.delete('/p/:product_id', checkAuth, productController.product_delete)

module.exports = Router