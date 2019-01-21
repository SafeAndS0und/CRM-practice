const express = require('express')
const Router = express.Router()
const checkAuth = require('../middlewares/check-auth')

const contractorController = require('../controllers/contractor')

Router.post('/', checkAuth, contractorController.contractor_add)
Router.get('/list/:page/:sort', checkAuth, contractorController.contractor_list)
Router.get('/k/:contractor_id', checkAuth, contractorController.contractor_detailed)
Router.delete('/k/:contractor_id', checkAuth, contractorController.contractor_delete)
Router.patch('/k/:contractor_id', checkAuth, contractorController.contractor_update)

module.exports = Router