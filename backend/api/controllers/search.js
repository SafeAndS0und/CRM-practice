//Models
const Contact = require('../models/contact')
const Contractor = require('../models/contractor')
const Invoice = require('../models/invoice')

exports.search = async (req, res, next) => {
    const query = req.query
    const modelName = req.params.model
    let model = null

    let result = []
    let errors = []
    let sort = ""
    let sortObj = {}
    let selectString = ''
    let alert = ""

    console.log(req.query.sortBy)
    //Sorting
    if(req.query.sortBy == undefined || req.query.sortBy.search(/_/) == -1) {
        errors.push(`Błędna składnia szukania 1(${req.query.sortBy})`)
    }
    else {
        sort = req.query.sortBy.split('_')
    }
    delete req.query.sortBy

    if(sort[0] == 'a') sort[0] = 1
    else if(sort[0] == 'd') sort[0] = -1
    else {
        errors.push(`Błędna składnia szukania 2(${sort[0]} ${sort[1]})`)
    }

    switch(sort[1]) {
        case 'ct': //creation time
            sortObj = {creationTime: sort[0]}
            break
        case 'ro': //record owner
            sortObj = {recordOwner: sort[0]}
            break
        case 'n': //number
            sortObj = {number: sort[0]}
            break
        case 'fn': //firstname
            sortObj = {firstname: sort[0]}
            break
        case 'sn': //surname
            sortObj = {surname: sort[0]}
            break
        case 'b': //business
            sortObj = {business: sort[0]}
            break;
        case 'be'://basic email
            sortObj = {basicEmail: sort[0]}
            break
        case 'bp'://basicPhone
            sortObj = {basicPhone: sort[0]}
            break
        case 'name'://contractor name
            sortObj = {name: sort[0]}
            break
        case 'wp': //webpage
            sortObj = {webpage: sort[0]}
            break
        case 'c':
            sortObj = {contractor: sort[0]}
            break
        case 's':
            sortObj = {status: sort[0]}
            break
        case 'pd':
            sortObj = {postDate: sort[0]}
            break
        case 'sp':
            sortObj = {signingPlace: sort[0]}
            break
        default: //default asc creation time
            sortObj = {creationTime: 1}
            break;
    }

    //Adding regexp to values of query object (for query to database)
    for(const key of Object.keys(query)) {
        query[key] = new RegExp(`.*${query[key]}.*`)
    }

    //Set module
    switch(modelName) {
        case 'contact':
            model = Contact
            selectString = '_id number firstname surname business basicEmail basicPhone recordOwner'
            break
        case 'contractor':
            model = Contractor
            selectString = '_id name webpage basicPhone recordOwner'
            break
        case 'invoice':
            model = Invoice
            selectString = '_id number contractor recordOwner status postDate signingPlace'
            break
        default:
            model = null
            break
    }

    //If module doesn't exists
    if(model == null)
        errors.push('Podany model nie istnieje')
        
    if(errors.length)
        return res.status(400).json({
            msg: 'Błąd',
            errors
        })

    //Query
    await model
    .find(query)
    .populate('recordOwner', 'firstname surname')
    .sort(sortObj)
    .select(selectString)
    .limit(15)
    .then(res => {
        result = res
    }).catch(err => {
        errors.push(err)
    })

    
    return res.status(200).json({
        msg: 'values',
        result
    })
}