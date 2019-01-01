const mongoose = require('mongoose')
const Stats = require('../models/stats')

exports.stats_increase = async (numberPrefix ) => {
    //The number will have generated prefix(C,K or F) depending on what will be increased, and the amount depending on the quantity in stats
    let number = ''

     await Stats.findOne({}, async (err, stats) => {
        if(err) throw err

        switch(numberPrefix) {
            case 'C': //contact
                stats.numOfContacts++
                number = `C${stats.numOfContacts}`
                break
            case 'K': //contractor
                stats.numOfContractors++
                number = `K${stats.numOfContractors}`
                break
            case 'F': //invoice
                stats.numOfInvoices++
                number = `F${stats.numOfInvoices}`
                break
            default:
                throw new Error('Bad prefix while increasing stats')
        }

        stats.save( async (err, updatedStats) => {
            if(err) throw err
        })
    })
    return number
}