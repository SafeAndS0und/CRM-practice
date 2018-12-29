const mongoose = require('mongoose')

const statsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    numOfContractors: {
        type: Number
    },
    numOfContacts: {
        type: Number
    },
    numOfInvoices: {
        type: Number
    }
})

module.exports = mongoose.model('stats', statsSchema)