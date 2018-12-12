const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const {JWT_KEY} = require('../../constants.json')
const jwt = require('jsonwebtoken')

//User login
exports.user_login = (req, res, next) => {

    //Get user data
    const user = {
        username: req.body.username ? req.body.username : '',
        password: req.body.password ? req.body.password : ''
    }

    //Check if user exists
    User
    .findOne({username: user.username})
    .then(result => {
        //If user isn't exist
        if(result.length == 0) {
            return res.status(400).json({
                msg: `Logowanie nie powiodło się.`,
                errors: ['Użytkownik nie istnieje.'],
                logged: false
            })
        }

        bcrypt.compare(user.password, result.password, (err, same) => {
            if(err) {
                console.log(err)
                return res.status(401).json({
                    msg: 'Ups... coś poszło nie tak.',
                    logged: false
                })
            }
            if(same) {
                //Create token
                const token = jwt.sign(
                    {
                        _id: result._id,
                        username: result.username
                    },
                    JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                )

                return res.status(200).json({
                    msg: 'Zalogowano.',
                    logged: true,
                    userData: {
                        firstname: result.firstname,
                        surname: result.surname,
                        isAdmin: result.isAdmin
                    },
                    token: token
                })
            }
            return res.status(400).json({
                msg: `Ups... wystąpił błąd`,
                errors: ['Błędne hasło.'],
                logged: false
            })
        })
        
    })
    .catch(err => {
        console.log(err)
        return res.status(400).json({
            msg: 'Logowanie nie powiodło się.',
            errors: ['Użytkownik nie istnieje.'],
            logged: false
        })
    })
}

exports.user_register = (req, res, next) => {

    console.log(req.userData)

    User
    .findOne({_id: req.userData._id, isAdmin: true})
    .select("isAdmin")
    .then(result => {
        if(result) {
            const newUser = {
                _id: mongoose.Types.ObjectId(),
                username: req.body.username ? req.body.username : '',
                password: req.body.password ? req.body.password : '',
                firstname: req.body.firstname ? req.body.firstname : '',
                surname: req.body.surname ? req.body.surname : '',
                isAdmin: req.body.isAdmin ? req.body.isAdmin : false
            }
        
            let errors = []
        
            User
            .find({username: newUser.username})
            .then(result => {
                //Validation
                for(let key in newUser) {
                    if(newUser[key] == null || newUser[key].length == 0) {
                        errors.push('Proszę wypełnić wszystkie pola.')
                        break
                    }
                }
        
                if(result.length > 0) {
                    errors.push('Podana nazwa użytkownika jest w użyciu.')
                }
                
                if(newUser.firstname.length == 0) {
                    errors.push('Proszę podać imię.')
                }
        
                if(newUser.surname.length == 0) {
                    errors.push('Proszę podać nazwisko.')
                }
        
                const usernameRegEx = /^[a-zA-Z0-9]+([\.\-]?[a-zA-Z0-9]+)$/
                if(!usernameRegEx.test(newUser.username)) { 
                    errors.push('Nazwa użytkownika może zawierać tylko litery A-Z, liczby i jedną kropkę.')
                }
        
                if(newUser.username.length < 6 || newUser.username.length > 15) {
                    errors.push('Nazwa użytkownika musi mieć długość od 6 do 15 znaków.')
                }
        
                if(newUser.password.length < 8 || newUser.password.length > 15) {
                    errors.push('Hasło musi posiadać długość od 8 do 15 znaków.')
                }
        
                if(errors.length > 0) {
                    res.status(400).json({
                        msg: 'Rejestracja nowego użytkownika nie powiodła się.',
                        errors: errors,
                        registered: false
                    })
                }
                
                //If no errors
                else {
                    //hash password
                    bcrypt.hash(newUser.password, 12, (err, hash) => {
                        if(err) {
                            console.log(err)
                            return res.status(500).json({
                                msg: 'Ups... coś poszło nie tak.',
                                registered: false
                            })
                        }
                        else {
                            newUser.password = hash
                            
                            const preparedNewUser = new User(newUser)
                            preparedNewUser
                            .save() //Add new user to DB
                            .then(result => {
                                res.status(201).json({
                                    msg: 'Dodano nowego użytkownika.',
                                    registered: true
                                })
                            })
                        }
                    })
                }
            })
        }
        else {
            return res.status(400).json({
                msg: 'Rejestracja nowego użytkownika nie powiodła się.',
                errors: ['Musisz posiadać prawa administratora.'],
                registered: false
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(400).json({
            msg: 'Ups... coś poszło nie tak.',
            registered: false
        })
    })
}