const mongoose = require('mongoose')
const User = require('../models/user')

//User login
exports.user_login = (req, res, next) => {

    //Get user data
    const user = {
        username: req.body.username,
        password: req.body.password
    }

    //Check if user exists
    User
    .findOne({username: user.username})
    .then(result => {
        //If user isn't exist
        if(!result) {
            return res.status(400).json({
                msg: `Logowanie nie powiodło się.`,
                errors: ['Użytkownik nie istnieje.'],
                logged: false
            })
        }

        //If user exist, compare password
        if(result.password == user.password) {
            return res.status(200).json({
                msg: 'Zalogowano.',
                logged: true,
                token: "12345"
            })
        }
        else {
            return res.status(400).json({
                msg: `Logowanie nie powiodło się.`,
                errors: ['Błędne hasło.'],
                logged: false
            })
        }
        
    })
    .catch(err => {
        return res.status(400).json({
            msg: `Logowanie nie powiodło się.`,
            errors: ['Użytkownik nie istnieje.'],
            logged: false
        })
    })
}