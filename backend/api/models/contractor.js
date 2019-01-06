const mongoose = require('mongoose')

const contractorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    //basic
    name: {
        type: String
    },
    number: {
        type: String
    },
    trade: {
        type: String
    },
    recordOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    creationTime : {
        type: Date,
        default: Date.now
    },
    modificationTime: {
        type: Date,
        default: Date.now
    },
    //contact
    basicPhone: {
        type: String
    },
    additionalPhone: {
        type: String
    },
    basicEmail: {
        type: String
    },
    additionalEmail: {
        type: String
    },
    webpage: {
        type: String
    },
    fax: {
        type: String
    },
    canContactViaEmail: {
        type: Boolean
    },
    canContactViaPhone: {
        type: Boolean
    },
    //finances
    sumOfInvoices: {
        type: Number
    },
    accountingBalance: {
        type: Number
    },
    //registration information
    nip: {
        type: String
    },
    krs: {
        type: String
    },
    regon: {
        type: String
    },
    //address
    street: {
        type: String
    },
    buildingNumber: {
        type: String
    },
    apartmentNumber: {
        type: String
    },
    postCode: {
        type: String
    },
    city: {
        type: String
    },
    voivodeship: {
        type: String
    },
    country: {
        type: String
    }
})

module.exports = mongoose.model('contractor', contractorSchema)