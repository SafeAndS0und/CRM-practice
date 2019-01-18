//Models
const Contact = require('../models/contact')
const Contractor = require('../models/contractor')

exports.search = async (req, res, next) => {
    const query = req.query
    const modelName = req.params.model
    let model = null

    let result = []
    let errors = []
    let sort = ""
    let sortObj = {}

    //Sorting
    sort = req.query.sortBy
    delete req.query.sortBy

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

    //Adding regexp to values of query object (for query to database)
    for(const key of Object.keys(query)) {
        query[key] = new RegExp(`.*${query[key]}.*`)
    }

    //Set module
    switch(modelName) {
        case 'contact':
            model = Contact
            break
        case 'contractor':
            model = Contractor
            break
        default:
            model = null
            break
    }

    //If module doesn't exists
    if(model == null)
        errors.push('Podany model nie istnieje')
    
    //Query
    await model
    .find(query)
    .populate('recordOwner', 'firstname surname')
    .sort(sortObj)
    .select('_id number firstname surname business basicEmail basicPhone recordOwner')
    .limit(15)
    .then(res => {
        result = res
    })
    .catch(err => {
        errors.push(err)
    })

    if(errors.length)
        return res.status(400).json({
            msg: 'Błąd',
            errors
        })
    
    return res.status(200).json({
        msg: 'values',
        result
    })
}