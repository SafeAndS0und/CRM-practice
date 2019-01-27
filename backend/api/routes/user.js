const express = require('express')
const Router = express.Router()
const checkAuth = require('../middlewares/check-auth')

//User controller
const userController = require('../controllers/user')

Router.post('/login', userController.user_login)
Router.post('/register', checkAuth, userController.user_register)
Router.post('/checkToken', userController.user_checkToken) //for testing
Router.get('/users', checkAuth, userController.user_list)
Router.get('/', checkAuth, userController.user_userData)
Router.put('/', checkAuth, userController.user_updateNoAdmin)
Router.put('/:id', checkAuth, userController.user_updateAdmin)
Router.delete('/:id', checkAuth, userController.user_delete)

module.exports = Router