const express = require('express')
const Router = express.Router()
const checkAuth = require('../middlewares/check-auth')

const contactController = require('../controllers/contact')

Router.post('/addContact', checkAuth, contactController.contact_addContact)
Router.get('/list/:page/:sort', checkAuth, contactController.contact_list)
Router.get('/c/:contact_id', checkAuth, contactController.contact_detailed)
Router.patch('/c/:contact_id', checkAuth, contactController.contact_update)

module.exports = Router