const mongoose = require('mongoose')
const Invoice = require('../models/invoice')
const Product = require('../models/product')

exports.product_add = async (req, res, next) => {
    const taxs = ["0", "5", "8", "23"]
    let errors = []

    const invoice_id = req.body.invoice_id
    
    
    if(!invoice_id || !mongoose.Types.ObjectId.isValid(invoice_id)) {
        return res.status(401).json({
            msg: 'Brak lub niepoprawne id faktury',
            added: false
        })
    }

    if(await Invoice.countDocuments({_id: invoice_id}) <= 0)
        return res.status(400).json({
             msg: 'Podana faktura nie istnieje.',
             added: false
        })

    const newProduct = {
        _id: mongoose.Types.ObjectId(),
        positionName: req.body.positionName,
        amount: req.body.amount ? req.body.amount : '',
        unit: req.body.unit ? req.body.unit : '',
        netUnitPrice: req.body.netUnitPrice ? req.body.netUnitPrice : '',
        tax: req.body.tax ? req.body.tax : '',
        netPrice: 0,
        grossPrice: 0
    }

    if(!taxs.filter(v => v == newProduct.tax).length)
        errors.push('Proszę podać prawidłowy podatek (0%, 5%, 8%, 23%)')

    if(newProduct.amount <= 0)
        errors.push('Proszę podać prawidłową minimalną ilość (1)')

    //Checking errors
    if(errors.length > 0) {
        return res.status(400).json({
            msg: 'Dodawanie nowego produktu nie powiodło się.',
            errors,
            added: false
        })
    }
    
    //Calculating net & gross prices
    newProduct.netPrice = (newProduct.netUnitPrice * newProduct.amount)
    if(newProduct.tax != 0)
        newProduct.grossPrice = newProduct.netPrice * newProduct.tax / 100 + newProduct.netPrice
    else
        newProduct.grossPrice = newProduct.netPrice

    newProduct.netPrice = newProduct.netPrice.toFixed(2)
    newProduct.grossPrice = newProduct.grossPrice.toFixed(2)

    const preparedProduct = new Product(newProduct)
    preparedProduct
    .save()
    .then(product => {

        Invoice
        .findOneAndUpdate({_id: invoice_id}, {$push: {products: product._id}})
        .then(result => {
            return res.status(200).json({
                msg: 'Dodano produkt do faktury',
                added: true
            })
        })
    })
    .catch(err => {
        console.log(err)
        return res.status(400).json({
            msg: 'Ups, coś poszło nie tak',
            added: false
        })
    })
}

exports.product_delete = async (req, res, next) => {
    const product_id = req.params.product_id

    if(await Product.countDocuments({_id: product_id}) <= 0) {
        return res.status(400).json({
            msg: 'Podany produkt nie istnieje',
            deleted: false
        })
    }

    Product.deleteOne({_id: product_id})
    .then(result => {
        return res.status(200).json({
            msg: 'Usunięto produkt',
            deleted: true
        })
    })
    .catch(err => {
        console.log(err)
        return res.status(400).json({
            msg: 'Ups, coś poszło nie tak',
            added: false
        })
    })
}