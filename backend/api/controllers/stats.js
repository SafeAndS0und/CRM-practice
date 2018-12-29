const mongoose = require('mongoose')
const Stats = require('../models/stats')

exports.stats_increase = (contractor = 0, contact = 0, invoice = 0) => {
    Stats.findOne({}, (err, stats) => {
        if(err) return console.log(err)

        stats.numOfContractors += contractor
        stats.numOfContacts += contact
        stats.numOfInvoices += invoice

        stats.save((err, updatedStats) => {
            if(err) return console.log(err)

            console.log(updatedStats)
        })
    })
}