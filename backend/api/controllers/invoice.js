const mongoose = require('mongoose')
const Invoice = require('../models/invoice')
const Product = require('../models/product')
const Stats = require('../models/stats')
const Contractor = require('../models/contractor')

exports.invoice_add = async (req, res, next) => {
    const newInvoice = {
        _id: mongoose.Types.ObjectId(),
        recordOwner: req.userData._id,
        number: '',
        contractor: req.body.contractor ? req.body.contractor : '',
        status: req.body.status ? req.body.status+"" : '',
        postDate: req.body.postDate ? req.body.postDate : '',
        dateOfImplementation: req.body.dateOfImplementation ? req.body.dateOfImplementation : '',
        paymentDeadline: req.body.paymentDeadline ? req.body.paymentDeadline : '',
        paymentMethod: req.body.paymentMethod ? req.body.paymentMethod : '',
        bankAccount: req.body.bankAccount ? req.body.bankAccount : '',
        signingPlace: req.body.signingPlace ? req.body.signingPlace : '',
        //address
        street: req.body.street ? req.body.street : '',
        buildingNumber: req.body.buildingNumber ? req.body.buildingNumber : '',
        apartmentNumber: req.body.apartmentNumber ? req.body.apartmentNumber : '',
        postCode: req.body.postCode ? req.body.postCode : '',
        city: req.body.city ? req.body.city : '',
        voivodeship: req.body.voivodeship ? req.body.voivodeship : '',
        country: req.body.country ? req.body.country : '',
        //Descriptive information
        description: req.body.description ? req.body.description : '',
        notes: req.body.notes ? req.body.notes : ''
    }

    // await console.log(Stats.findOne({}))

    Stats
    .findOne({}, (err, stats) => {
        if(err) throw err

        stats.numOfInvoices++
        newInvoice.number = `F${stats.numOfInvoices}`

        stats
        .save((err, updatedStats) => {
            if(err) throw err

            const preparedInvoice = new Invoice(newInvoice)
            preparedInvoice
            .save()
            .then(async result => {

                //Setting numOfInvoices in contractor
                const sumOfInvoices = await Invoice.countDocuments({contractor: result.contractor})
                await Contractor.findOneAndUpdate({_id: result.contractor}, {
                    sumOfInvoices
                })

                return res.status(201).json({
                    msg: 'Dodano nową fakturę.',
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

exports.invoice_list = (req, res, next) => {
    //_id recordOwner status postDate signingPlace contractor(name)
    Invoice.countDocuments({}, (err, invoiceCount) => {
        let page = req.params.page
        if(page <= 0) page = 1

        
        let docsPerPage = 15 //Documents per page
        const skipDocs = page * docsPerPage - docsPerPage

        let numOfPages = Math.ceil(invoiceCount / docsPerPage)
        
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
            case 'a_s': //asc status
                sortObj = {status: 1}
                break;
            case 'd_s': //desc status
                sortObj = {status: -1}
                break;
            case 'a_postDate': //asc postDate
                sortObj = {postDate: 1}
                break;
            case 'd_postDate': //desc postDate
                sortObj = {postDate: -1}
                break;
            case 'a_sp': //asc signingPlace
                sortObj = {signingPlace: 1}
                break;
            case 'd_sp': //desc signingPlace
                sortObj = {signingPlace: -1}
                break;
            default: //default asc creation time
                sortObj = {creationTime: 1}
                break;
        }

        Invoice
        .find({}, null, {skip: skipDocs, limit: docsPerPage})
        .populate([
            {
                path: 'recordOwner',
                model: 'user',
                select: 'firstname surname'
            },
            {
                path: 'contractor',
                model: 'contractor',
                select: 'name'
            }
        ])
        .sort(sortObj)
        .select('_id number contractor recordOwner status postDate signingPlace')
        .then(invoices => {
            return res.status(200).json({
                numOfPages: numOfPages,
                invoices
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

exports.invoice_detailed = (req, res, next) => {
    const invoice_id = req.params.invoice_id

    if(!invoice_id || !mongoose.Types.ObjectId.isValid(invoice_id)) {
        return res.status(401).json({
            msg: 'Brak lub niepoprawne id faktury',
            deleted: false
        })
    }

    Invoice
    .findOne({_id: invoice_id})
    .populate([
        {
            path: 'recordOwner',
            model: 'user',
            select: 'firstname surname'
        },
        {
            path: 'contractor',
            model: 'contractor',
            select: 'name number'
        },
        {
            path: 'product',
            model: 'product',
        },
        {
            path: 'products',
            model: 'product'
        }
    ])
    .select('-invoice')
    .then(invoice => {
        if(invoice) {
            return res.status(200).json({
                invoice
            })
        }
        else {
            return res.status(400).json({
                msg: 'Faktura nie istnieje'
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

exports.invoice_delete = async (req, res, next) => {
    const invoice_id = req.params.invoice_id

    if(await Invoice.countDocuments({_id: invoice_id}) <= 0) {
        return res.status(400).json({
            msg: 'Podana faktura nie istnieje',
            deleted: false
        })
    }

    Invoice
    .findOneAndDelete({_id: invoice_id})
    .then(async result => {
        //Setting numOfInvoices in contractor
        await this.updateNumOfInvoices(result.contractor)

        return res.status(200).json({
            msg: 'Usunięto fakturę',
            deleted: true
        })
    })
    .catch(err => {
        console.log(err)
        return res.status(400).json({
            msg: 'Coś poszło nie tak.',
            deleted: false
        })
    })
}

exports.invoice_update = async (req, res, next) => {
    const invoice_id = req.params.invoice_id

    if(!invoice_id || !mongoose.Types.ObjectId.isValid(invoice_id)) {
        return res.status(401).json({
            msg: 'Brak lub niepoprawne id kontrahenta',
            updated: false
        })
    }

    const updateInvoice = {
        modificationTime: new Date(Date.now()).toISOString(),
        status: req.body.status ? req.body.status+"" : '',
        postDate: req.body.postDate ? req.body.postDate : '',
        dateOfImplementation: req.body.dateOfImplementation ? req.body.dateOfImplementation : '',
        paymentDeadline: req.body.paymentDeadline ? req.body.paymentDeadline : '',
        paymentMethod: req.body.paymentMethod ? req.body.paymentMethod : '',
        bankAccount: req.body.bankAccount ? req.body.bankAccount : '',
        signingPlace: req.body.signingPlace ? req.body.signingPlace : '',
        //address
        street: req.body.street ? req.body.street : '',
        buildingNumber: req.body.buildingNumber ? req.body.buildingNumber : '',
        apartmentNumber: req.body.apartmentNumber ? req.body.apartmentNumber : '',
        postCode: req.body.postCode ? req.body.postCode : '',
        city: req.body.city ? req.body.city : '',
        voivodeship: req.body.voivodeship ? req.body.voivodeship : '',
        country: req.body.country ? req.body.country : '',
        //Descriptive information
        description: req.body.description ? req.body.description : '',
        notes: req.body.notes ? req.body.notes : ''
    }

    if(await Invoice.countDocuments({_id: invoice_id}) <= 0) {
        return res.status(400).json({
            msg: 'Podana faktura nie istnieje',
            updated: false
        })
    }

    Invoice
    .findOneAndUpdate({_id: invoice_id}, updateInvoice)
    .then(updatedInvoice => {
        return res.status(200).json({
            msg: `Zaktualizowano fakturę ${updatedInvoice.number}`,
            updated: true
        })
    })
    .catch(err => {
        console.log(err)
        return res.status(400).json({
            msg: 'Coś poszło nie tak.',
            updated: false
        })
    })


}

exports.updateNumOfInvoices = async function setNumOfInvoices(contractor_id) {
    const sumOfInvoices = await Invoice.countDocuments({contractor: contractor_id})
    await Contractor.findOneAndUpdate({_id: contractor_id}, {
        sumOfInvoices
    })
}