const mongoose = require('mongoose')
const User = require('../models/user')
const Contact = require('../models/contact')
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
                        expiresIn: "24h"
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
            errors: ['Użytkownik nie istnieje.'], // zmienić
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
                            .then(newUser => {
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

exports.user_checkToken = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(400).json({
            msg: "Brak tokenu",
            token: false
        })
    }

    try {
        const token = req.headers.authorization
        const decoded = jwt.verify(token, JWT_KEY)
        
        res.status(200).json({
            msg: "Token jest poprawny.",
            token: true
        })
    }
    catch(error) {
        console.log(error)
        res.status(401).json({
            msg: "Błąd z tokenem. Zbugowany lub stracił ważność.",
            token: false
        })
    }
}

exports.user_list = async (req, res, next) => {
    const user = await User.findOne({_id: req.userData._id}).select('isAdmin')
    if( ! user.isAdmin) return res.status(400).json({ msg: 'Nie masz uprawnień.' })

    const usersList = await User.find({})
    .select('-password')

    return res.status(200).json({
        usersList
    })
}

exports.user_userData = async (req, res, next) => {
    const userData = await User.findOne({_id: req.userData._id})
    .select('-password')

    return res.status(200).json({
        userData
    })
}

exports.user_updateNoAdmin = async (req, res, next) => {
    const userData = await User.findOne({_id: req.userData._id})

    const updatedUser = {
        username: req.body.username ? req.body.username : '',
        password: req.body.password ? await returnHashedPassword(req.body.password) : userData.password,
        firstname: req.body.firstname ? req.body.firstname : '',
        surname: req.body.surname ? req.body.surname : '',
        birth: req.body.birth ? req.body.birth : '',
        phone: req.body.phone ? req.body.phone : ''
    }

    await User.findOneAndUpdate({_id: req.userData._id}, updatedUser)

    return res.status(200).json({
        msg: 'Zaktualizowano dane'
    })
}

exports.user_updateAdmin = async (req, res, next) => {
    const userId = req.params.id
    
    if(!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(401).json({
            msg: 'Brak lub niepoprawne id usera',
        })
    }

    const userData = await User.findOne({_id: userId})

    const updatedUser = {
        username: req.body.username ? req.body.username : '',
        password: req.body.password ? await returnHashedPassword(req.body.password) : userData.password,
        firstname: req.body.firstname ? req.body.firstname : '',
        surname: req.body.surname ? req.body.surname : '',
        birth: req.body.birth ? req.body.birth : '',
        phone: req.body.phone ? req.body.phone : ''
    }

    await User.findOneAndUpdate({_id: userId}, updatedUser)

    return res.status(200).json({
        msg: 'Zaktualizowano dane'
    })
}

exports.user_delete = async (req, res, next) => {
    const user = await User.findOne({_id: req.userData._id}).select('isAdmin')
    if( ! user.isAdmin) return res.status(400).json({ msg: 'Nie masz uprawnień.' })
    
    const userId = req.params.id

    if(!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(401).json({
            msg: 'Brak lub niepoprawne id usera',
        })
    }

    await User.findOneAndDelete({_id: userId})

    return res.status(200).json({
        msg: 'Usunięto użytkownika'
    })
}

async function returnHashedPassword(password) {
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, 12, function(err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })
    return hashedPassword
}