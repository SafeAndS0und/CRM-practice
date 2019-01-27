const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        required: true,
        type: String
    },
    password: {
        require: true,
        type: String
    },
    firstname: {
        type: String
    },
    surname: {
        type: String
    },
    isAdmin: {
        type: Boolean
    },
    birth: {
        type: String
    },
    phone: {
        type: String
    }
})

module.exports = mongoose.model('user', userSchema)