const mongoose = require('mongoose')
const Stats = require('../controllers/stats')

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
        type: Date,
        default: Date.now
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

contactSchema.pre('save', async function(next) {
    await Stats.stats_increase(0, 1)
    next()
})

module.exports = mongoose.model('contact', contactSchema)