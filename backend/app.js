//Modules
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

//Config
const {DB_USER_PASSWORD, DB_USER_NAME, DB_NAME} = require('./constants.json')

//Connect to db
mongoose.connect(`mongodb+srv://${DB_USER_NAME}:${DB_USER_PASSWORD}@cluster0-hktd3.mongodb.net/${DB_NAME}`, {
    useNewUrlParser: true
})

//App init
const app = express()

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

//Routes
const userRouter = require('./api/routes/user')
const contactRouter = require('./api/routes/contact')
const searchRouter = require('./api/routes/search')
const commentRouter = require('./api/routes/comment')
const contractorRouter = require('./api/routes/contractor')
const invoiceRouter = require('./api/routes/invoice')
const productRouter = require('./api/routes/product')

//Use routes
app.use('/user', userRouter)
app.use('/contact', contactRouter)
app.use('/search', searchRouter)
app.use('/comment', commentRouter)
app.use('/contractor', contractorRouter)
app.use('/invoice', invoiceRouter)
app.use('/product', productRouter)

//Handling error(Not found)
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404

    next(error)
})

app.use((error, req, res, next) => {
    const status = error.status || 500

    res.status(status).json({
        error: error.message
    })
})

//Export app
module.exports = app