const express = require('express')
const Router = express.Router()
const checkAuth = require('../middlewares/check-auth')

const commentController = require('../controllers/comment')

Router.post('/', checkAuth, commentController.addComment)
Router.post('/reply', checkAuth, commentController.addReply)
Router.get('/content/:content_id', checkAuth,commentController.getCommets)

module.exports = Router