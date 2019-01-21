const mongoose = require('mongoose')
const Contractor = require('../models/contractor')
const Stats = require('../models/stats')

exports.contractor_add = (req, res, next) => {
    const newContractor = {
        _id: mongoose.Types.ObjectId(),

        name: req.body.name ? req.body.name : '',
        number: '',
        trade: req.body.trade ? req.body.trade : '',
        recordOwner: req.userData._id,
        //contact
        basicPhone: req.body.basicPhone ? req.body.basicPhone : '',
        additionalPhone: req.body.additionalPhone ? req.body.additionalPhone : '',
        basicEmail: req.body.basicEmail ? req.body.basicEmail : '',
        additionalEmail: req.body.additionalEmail ? req.body.additionalEmail : '',
        webpage: req.body.webpage ? req.body.webpage : '',
        fax: req.body.fax ? req.body.fax : '',
        canContactViaEmail: req.body.canContactViaEmail ? req.body.canContactViaEmail : false,
        canContactViaPhone: req.body.canContactViaPhone ? req.body.canContactViaPhone : false,
        //registration information
        nip: req.body.nip ? req.body.nip : '',
        krs: req.body.krs ? req.body.krs : '',
        regon: req.body.regon ? req.body.regon : '',
        //address
        street: req.body.street ? req.body.street : '',
        buildingNumber: req.body.buildingNumber ? req.body.buildingNumber : '',
        apartmentNumber: req.body.apartmentNumber ? req.body.apartmentNumber : '',
        postCode: req.body.postCode ? req.body.postCode : '',
        city: req.body.city ? req.body.city : '',
        voivodeship: req.body.voivodeship ? req.body.voivodeship : '',
        country: req.body.country ? req.body.country : ''
    }

    //Here will be validation

    Stats.findOne({}, (err, stats) => {
        if(err) throw err

        stats.numOfContractors++;
        newContractor.number = `K${stats.numOfContractors}`

        stats.save((err,updatedStats) => {
            if(err) throw err

            const preparedNewContractor = new Contractor(newContractor)
            preparedNewContractor
            .save()
            .then(result => {
                return res.status(201).json({
                    msg: 'Dodano nowego kontrahenta',
                    _id: result._id,
                    added: true
                })
            })
            .catch(err => {
                console.log(err)
                return res.status(400).json({
                    msg: 'Ups, cos poszlo nie tak',
                    added: false
                })
            })
        })
    })
}

exports.contractor_list = (req, res, next) => {
    Contractor.countDocuments({}, (err, contractorCount) => {
        let page = req.params.page
        if(page <= 0) page = 1

        
        let docsPerPage = 15 //Documents per page
        const skipDocs = page * docsPerPage - docsPerPage

        let numOfPages = Math.ceil(contractorCount / docsPerPage)
        
        const sort = req.params.sort
        let sortObj = {}

        if(page > numOfPages) {
            if(page > numOfPages) {
                return res.status(204).json({
                    msg: `Brak kontrahentów. Strona: ${page}`,
                    numOfPages: numOfPages
                })
            }   
        }

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
            case 'a_w': //asc webpage
                sortObj = {webpage: 1}
                break;
            case 'd_w': //desc webpage
                sortObj = {webpage: -1}
                break;
            case 'a_p': //asc basicPhone
                sortObj = {basicPhone: 1}
                break;
            case 'd_p': //desc basicPhone
                sortObj = {basicPhone: -1}
                break;
            default: //default asc creation time
                sortObj = {creationTime: 1}
                break;
        }

        Contractor
        .find({}, null, {skip: skipDocs, limit: docsPerPage})
        .populate('recordOwner', 'firstname surname')
        .sort(sortObj)
        .select("_id name number webpage basicPhone recordOwner")
        .then(contractors => {
            return res.status(200).json({
                numOfPages: numOfPages,
                contractors
            })
        })
    })
    .catch(err => {
        console.log(err)
        return res.status(400).json({
            msg: 'Coś poszło nie tak.'
        })
    })
}

exports.contractor_detailed = (req, res, next) => {
    const contractor_id = req.params.contractor_id

    if(!contractor_id || !mongoose.Types.ObjectId.isValid(contractor_id)) {
        return res.status(401).json({
            msg: 'Brak lub niepoprawne id kontrahenta',
            deleted: false
        })
    }

    Contractor
    .findOne({_id: contractor_id})
    .populate('recordOwner', 'firstname surname')
    .then(contractor => {
        if(contractor) {
            return res.status(200).json({
                contractor
            })
        }
        else {
            return res.status(400).json({
                msg: 'Kontrahent nie istnieje.'
            })
        }
    })
    .catch(err => {
        console.log(err)
        return res.status(400).json({
            msg: 'Coś poszło nie tak.'
        })
    })

}

exports.contractor_update = (req, res, next) => {
    console.log('REQ \n', req.body)
    const contractor_id = req.params.contractor_id

    if(!contractor_id || !mongoose.Types.ObjectId.isValid(contractor_id)) {
        return res.status(401).json({
            msg: 'Brak lub niepoprawne id kontrahenta',
            deleted: false
        })
    }

    const updateContractor = {
        modificationTime: new Date(Date.now()).toISOString(),
        name: req.body.name ? req.body.name : '',
        trade: req.body.trade ? req.body.trade : '',
        //contact
        basicPhone: req.body.basicPhone ? req.body.basicPhone : '',
        additionalPhone: req.body.additionalPhone ? req.body.additionalPhone : '',
        basicEmail: req.body.basicEmail ? req.body.basicEmail : '',
        additionalEmail: req.body.additionalEmail ? req.body.additionalEmail : '',
        webpage: req.body.webpage ? req.body.webpage : '',
        fax: req.body.fax ? req.body.fax : '',
        canContactViaEmail: req.body.canContactViaEmail ? req.body.canContactViaEmail : false,
        canContactViaPhone: req.body.canContactViaPhone ? req.body.canContactViaPhone : false,
        //registration information
        canContactViaPhone: req.body.canContactViaPhone ? req.body.canContactViaPhone : false,
        nip: req.body.nip ? req.body.nip : '',
        krs: req.body.krs ? req.body.krs : '',
        regon: req.body.regon ? req.body.regon : '',
        //address
        street: req.body.street ? req.body.street : '',
        buildingNumber: req.body.buildingNumber ? req.body.buildingNumber : '',
        apartmentNumber: req.body.apartmentNumber ? req.body.apartmentNumber : '',
        postCode: req.body.postCode ? req.body.postCode : '',
        city: req.body.city ? req.body.city : '',
        voivodeship: req.body.voivodeship ? req.body.voivodeship : '',
        country: req.body.country ? req.body.country : ''
    }

    console.log('UPDATE CONTRACTOR \n', updateContractor)
    //Here will be validation

    Contractor
    .findOne({_id: contractor_id})
    .then(result => {
        if(result) {
            Contractor
            .findOneAndUpdate({_id: result._id}, updateContractor)
            .then(contractor => {
                return res.status(200).json({
                    msg: `Zaktualizowano kontrahenta ${contractor.number}.`,
                    updated: true
                })
            })
        }
        else {
            return res.status(400).json({
                msg: `Kontrahent nie istnieje.`,
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

exports.contractor_delete = (req, res, next) => {
    const contractor_id = req.params.contractor_id

    if(!contractor_id || !mongoose.Types.ObjectId.isValid(contractor_id)) {
        return res.status(401).json({
            msg: 'Brak lub niepoprawne id kontrahenta',
            deleted: false
        })
    }

    Contractor
    .findOne({_id: contractor_id})
    .then(contractor => {
        if(contractor) {
            Contractor
            .deleteOne({_id: contractor_id})
            .then(result => {
                return res.status(200).json({
                    msg: `Usunięto kontrahenta ${contractor.number}.`,
                    deleted: true
                })
            })
        }
        else {
            return res.status(400).json({
                msg: `Kontrahent nie istnieje.`,
                deleted: false
            })
        }
    })
    .catch(err => {
        console.log(err)
        return res.status(400).json({
            msg: `Coś poszło nie tak.`,
            deleted: false
        })
    })
}