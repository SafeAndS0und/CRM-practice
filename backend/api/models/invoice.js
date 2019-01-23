const mongoose = require('mongoose')

const invoiceSchema = mongoose.Schema({
    //Invoice details
    _id: mongoose.Schema.Types.ObjectId,
    number: {
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
    contractor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contractor'
    },
    status: {
        type: String //(1- Wersja robocza,2-  Wymaga weryfikacji, 3- Zatwierdzona,4- Wyksięgowana,5- Zaksięgowana,6- Anulowana)
    },
    postDate: {
        type: Date
    },
    dateOfImplementation: {
        type: Date
    },
    paymentDeadline: {
        type: Date
    },
    paymentMethod: {
        type: String //(1- Przelew, 2- Gotówka)
    },
    bankAccount: {
        type: String
    },
    signingPlace: {
        type: String
    },
    //Address
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
    },
    //Descriptive information
    description: {
        type: String
    },
    notes: {
        type: String
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }]
})

module.exports = mongoose.model('invoice', invoiceSchema)