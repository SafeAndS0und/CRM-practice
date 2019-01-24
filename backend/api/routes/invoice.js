const express = require('express')
const Router = express.Router()
const checkAuth = require('../middlewares/check-auth')

const invoiceController = require('../controllers/invoice')

Router.post('/', checkAuth, invoiceController.invoice_add)
Router.get('/list/:page/:sort', checkAuth, invoiceController.invoice_list)
Router.get('/f/:invoice_id', checkAuth, invoiceController.invoice_detailed)
Router.delete('/f/:invoice_id', checkAuth, invoiceController.invoice_delete)
Router.patch('/f/:invoice_id', checkAuth, invoiceController.invoice_update)

module.exports = Router