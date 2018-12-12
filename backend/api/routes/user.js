const express = require('express')
const Router = express.Router()

//User controller
const userController = require('../controllers/user')

Router.post('/login', userController.user_login)
Router.post('/register', userController.user_register)

module.exports = Router