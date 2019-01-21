const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('../../constants.json')

module.exports = (req, res, next) => {
    if(!req.headers.authorization) return res.status(400).json({
        msg: "Brak tokenu uwierzytelniającego.",
        auth: false
    })

    try {
        const token = req.headers.authorization
        const decoded = jwt.verify(token, JWT_KEY)
        req.userData = decoded
        next()
    }
    catch(error) {
        res.status(401).json({
            msg: "Błąd z sesją.",
            auth: false
        })
    }
}