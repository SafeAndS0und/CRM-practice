const mongoose = require('mongoose')
const Contact = require('../models/contact')

exports.contact_addContact = (req, res, next) => {
    Contact.countDocuments({}, (err, c) => {
        const newContact = {
            _id: mongoose.Types.ObjectId(),
            //basic info
            number: `C${c + 1}`,
            firstname: req.body.firstname ? req.body.firstname : '',
            surname: req.body.surname ? req.body.surname : '',
            business: req.body.business ? req.body.business : '',
            recordOwner: req.userData._id,
            //contact info
            basicPhone: req.body.basicPhone ? req.body.basicPhone : '',
            additionalPhone: req.body.additionalPhone ? req.body.additionalPhone : '',
            basicEmail: req.body.basicEmail ? req.body.basicEmail : '',
            additionalEmail: req.body.additionalEmail ? req.body.additionalEmail : '',
            skype: req.body.skype ? req.body.skype : '',
            canContactViaEmail: req.body.canContactViaEmail ? req.body.canContactViaEmail : false,
            canContactViaPhone: req.body.canContactViaPhone ? req.body.canContactViaPhone : false,
            //address info
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
            return res.status(201).json({
                msg: 'Dodano nowy kontakt',
                added: true
            })
        })
    })
    .catch(err => {
        console.log(err)
        return res.status(400).json({
            msg: 'Ups, cos poszlo nie tak',
            added: false
        })
    })
}

exports.contact_list = (req, res, next) => {
    const page = req.params.page
    if(page <= 0) page = 1

    const docsPerPage = 15 //Documents per page
    const skipDocs = page * docsPerPage - docsPerPage
    
    const sort = req.params.sort
    let sortObj = {}

    switch(sort) {
        case 'a_ct': //asc creation time
            sortObj = {creationTime: 1}
            break;
        case 'd_ct': //desc creation time
            sortObj = {creationTime: -1}
            break;
        case 'a_ro': //asc record owner
            sortObj = {recordOwner: 1}
            break;
        case 'd_ro': //desc record owner
            sortObj = {recordOwner: -1}
            break;
        case 'a_n': //asc number
            sortObj = {number: 1}
            break;
        case 'd_n': //desc number
            sortObj = {number: -1}
            break;
        case 'a_fn': //asc firstname
            sortObj = {firstname: 1}
            break;
        case 'd_fn': //desc firstname
            sortObj = {firstname: -1}
            break;
        case 'a_sn': //asc surname
            sortObj = {surname: 1}
            break;
        case 'd_sn': //desc surname
            sortObj = {surname: -1}
            break;
        case 'a_b': //asc business
            sortObj = {business: 1}
            break;
        case 'd_b': //desc business
            sortObj = {business: -1}
            break;
        default: //default asc creation time
            sortObj = {creationTime: 1}
            break;
    }

    Contact
    .find({}, null, {skip: skipDocs, limit: docsPerPage})
    .sort(sortObj)
    .select("_id number firstname surname business basicEmail basicPhone recordOwner")
    .then(contacts => {
        let msg = ''

        if(contacts.length == 0) {
            msg = `Brak kontaktów. Strona: ${page}`
        }
        return res.status(200).json({
            msg: msg,
            contacts: contacts
        })
    })
    .catch(err => {
        console.log(err)
        return res.status(400).json({
            msg: 'Coś poszło nie tak.'
        })
    })
}

exports.contact_detailed = (req, res, next) => {
    const contact_id = req.params.contact_id

    if(!contact_id || !mongoose.Types.ObjectId.isValid(contact_id)) {
        return res.status(401).json({
            msg: 'Brak lub niepoprawne id kontaktu.',
            updated: false
        })
    }
    
    Contact
    .findOne({_id: contact_id})
    // .select("-number")
    .populate('recordOwner', 'firstname surname')
    .then(contact => {

        if(contact) {
            return res.status(200).json({
                contact: contact
            })
        }
        else {
            return res.status(400).json({
                msg: 'Kontakt nie istnieje.'
            })
        }
    })
    .catch(err => {
        console.log(err)
        return res.status(400).json({
            msg: 'Cos poszło nie tak.'
        })
    })
}

exports.contact_update = (req, res, next) => {
    const contact_id = req.params.contact_id

    if(!contact_id || !mongoose.Types.ObjectId.isValid(contact_id)) {
        return res.status(401).json({
            msg: 'Brak lub niepoprawne id kontaktu.',
            updated: false
        })
    }
    const updateContact = {
        //basic info
        firstname: req.body.firstname ? req.body.firstname : '',
        surname: req.body.surname ? req.body.surname : '',
        business: req.body.business ? req.body.business : '',
        modificationTime: new Date(Date.now()).toISOString(),
        //contact info
        basicPhone: req.body.basicPhone ? req.body.basicPhone : '',
        additionalPhone: req.body.additionalPhone ? req.body.additionalPhone : '',
        basicEmail: req.body.basicEmail ? req.body.basicEmail : '',
        additionalEmail: req.body.additionalEmail ? req.body.additionalEmail : '',
        skype: req.body.skype ? req.body.skype : '',
        canContactViaEmail: req.body.canContactViaEmail ? req.body.canContactViaEmail : false,
        canContactViaPhone: req.body.canContactViaPhone ? req.body.canContactViaPhone : false,
        //address info
        street: req.body.street ? req.body.street : '',
        buildingNumber: req.body.buildingNumber ? req.body.buildingNumber : '',
        apartmentNumber: req.body.apartmentNumber ? req.body.apartmentNumber : '',
        postCode: req.body.postCode ? req.body.postCode : '',
        city: req.body.city ? req.body.city : '',
        voivodeship: req.body.voivodeship ? req.body.voivodeship : '',
        country: req.body.country ? req.body.country : ''
    }

    Contact
    .findOne({_id: contact_id})
    .then(result => {
        if(result) {
            Contact
            .findOneAndUpdate({_id: contact_id}, updateContact)
            .then(contact => {
                console.log(contact)
        
                return res.status(200).json({
                    msg: `Zaktualizowano kontakt ${contact.number}.`,
                    updated: true
                })
            })
        }
        else { 
            return res.status(400).json({
                msg: `Kontakt nie istnieje.`,
                updated: false
            })
        }
    })
    .catch(err => {
        console.log(err)
        return res.status(400).json({
            msg: 'Coś poszło nie tak.',
            updated: false
        })
    })
}

exports.contact_delete = (req, res, next) => {
    const contact_id = req.params.contact_id

    if(!contact_id || !mongoose.Types.ObjectId.isValid(contact_id)) {
        return res.status(401).json({
            msg: 'Brak lub niepoprawne id kontaktu.',
            deleted: false
        })
    }

    Contact
    .findOne({_id: contact_id})
    .then(contact => {
        if(contact) {
            Contact
            .deleteOne({_id: contact_id})
            .then(result => {
                res.status(200).json({
                    msg: `Usunięto kontakt ${contact.number}`,
                    deleted: true
                })
            })
        }
        else {
            res.status(400).json({
                msg: `Kontakt nie istnieje.`,
                deleted: false
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(400).json({
            msg: 'Coś poszło nie tak.',
            deleted: false
        })
    })
}