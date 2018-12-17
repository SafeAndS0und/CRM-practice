const express = require('express')
const Router = express.Router()
const checkAuth = require('../middlewares/check-auth')

//User controller
const userController = require('../controllers/user')

Router.post('/login', userController.user_login)
Router.post('/register', checkAuth, userController.user_register)
Router.post('/checkToken', userController.user_checkToken) //for testing

module.exports = Router