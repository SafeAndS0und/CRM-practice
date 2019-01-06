const express = require('express')
const Router = express.Router()
const checkAuth = require('../middlewares/check-auth')

const searchController = require('../controllers/search')

Router.get('/:model', checkAuth, searchController.search)

module.exports = Router