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
                userData: {
                    firstname: result.firstname,
                    surname: result.surname,
                    isAdmin: result.isAdmin
                },
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

exports.user_register = (req, res, next) => {

    const newUser = {
        _id: mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname ? req.body.firstname : null,
        surname: req.body.surname ? req.body.surname : null,
        isAdmin: req.body.isAdmin ? req.body.isAdmin : null
    }

    User
    .findOne({username: newUser.username})
    .then(result => {
        
        const preparedNewUser = new User(newUser)

        preparedNewUser
        .save()
        .then(result => {
            res.status(201).json({
                msg: "Dodano nowego uzytkownika"
            })
        })

    })
    .catch(err => {
        console.log(err)
        res.status(400).json({
            msg: "Wyjebal error"
        })
    })
}