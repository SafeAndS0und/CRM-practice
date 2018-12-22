const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    //basic information
    _id: mongoose.Schema.Types.ObjectId,
    number: {
        type: String
    },
    firstname: {
        type: String
    },
    surname: {
        type: String
    },
    business: {
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
        type: Date
    },
    //contact info
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
    skype: {
        type: String
    },
    canContactViaEmail: {
        type: Boolean
    },
    canContactViaPhone: {
        type: Boolean
    },
    //address information
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

module.exports = mongoose.model('contact', contactSchema)