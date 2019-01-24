const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    invoice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'invoice'
    },
    positionName: {
        type: String
    },
    amount: {
        type: Number
    },
    unit: {
        type: String
    },
    netUnitPrice: {
        type: Number
    },
    tax: {
        type: Number //only: 0%, 5%, 8%, 23%
    },
    netPrice: {
        type: Number
    },
    grossPrice: {
        type: Number
    }
})

module.exports = mongoose.model('product', productSchema)