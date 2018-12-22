const mongoose = require('mongoose')
const Contact = require('../models/contact')

exports.contact_addContact = (req, res, next) => {
    const newContact = {
        _id: mongoose.Types.ObjectId(),
        //basic information
        number: req.body.number ? req.body.number : '',
        firstname: req.body.firstname ? req.body.firstname : '',
        surname: req.body.surname ? req.body.surname : '',
        business: req.body.business ? req.body.business : '',
        recordOwner: req.body.recordOwner ? req.body.recordOwner : '',
        basicPhone: req.body.basicPhone ? req.body.basicPhone : '',
        additionalPhone: req.body.additionalPhone ? req.body.additionalPhone : '',
        basicEmail: req.body.basicEmail ? req.body.basicEmail : '',
        additionalEmail: req.body.additionalEmail ? req.body.additionalEmail : '',
        skype: req.body.skype ? req.body.skype : '',
        canContactViaEmail: req.body.canContactViaEmail ? req.body.canContactViaEmail : false,
        canContactViaPhone: req.body.canContactViaPhone ? req.body.canContactViaPhone : false,
        street: req.body.street ? req.body.street : '',
        buildingNumber: req.body.buildingNumber ? req.body.buildingNumber : '',
        apartmentNumber: req.body.apartmentNumber ? req.body.apartmentNumber : '',
        postCode: req.body.postCode ? req.body.postCode : '',
        city: req.body.city ? req.body.city : '',
        voivodeship: req.body.voivodeship ? req.body.voivodeship : '',
        country: req.body.country ? req.body.country : ''
    }

    const preparedNewContact = new Contact(newContact)
    preparedNewContact
    .save()
    .then(result => {
        res.status(201).json({
            msg: 'Dodano nowy kontakt',
            added: true
        })
    })
    .catch(err => {
        console.log(err)
        res.status(400).json({
            msg: 'Ups, cos poszlo nie tak',
            added: false
        })
    })
}

exports.contact_list = (req, res, next) => {
    Contact
    .find({})
    .select("firstname surname business basicEmail basicPhone recordOwner")
    .then(contacts => {
        console.log(contacts)
        res.status(200).json({
            contacts: contacts
        })
    })
    .catch(err => {
        console.log(err)
        return res.status(400).json({
            msg: 'Coś poszło nie tak'
        })
    })
}