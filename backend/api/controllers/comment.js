const mongoose = require('mongoose')
const Comment = require('../models/comment')
const CommentReply = require('../models/commentReply')

exports.addComment = (req, res, next) => {

    const newComment = {
        _id: mongoose.Types.ObjectId(),
        content_id: req.body.content_id,
        author: req.userData._id,
        content: req.body.content
    }

    const preparedNewComment = new Comment(newComment)

    preparedNewComment
    .save()
    .then(result => {
        console.log(result)
        return res.status(200).json({
            msg: 'Dodano nowy komentarz'
        })
    })
    .catch(err => {
        console.log(err)
        return res.status(400).json({
            msg: 'Ups, coś poszło nie tak'
        })
    })
}

exports.getCommets = (req, res, next) => {
    let content_id = req.params.content_id

    Comment
    .find({content_id})
    // .select('-content_id -__v')
    .populate('replies')
    .then(result => {
        return res.status(200).json({
            result
        })
    })
    .catch(err => {
        console.log(err)
        return res.status(400).json({
            msg: 'Ups, coś poszło nie tak'
        })
    })
}

exports.addReply = (req, res, next) => {
    let comment_id = req.body.comment_id

    console.log(comment_id)

    let newReply = {
        _id: mongoose.Types.ObjectId(),
        comment_id: comment_id,
        author: req.userData._id,
        content: req.body.content
    }

    const preparedReply = new CommentReply(newReply)

    preparedReply
    .save()
    .then(reply => {

        Comment
        .findOneAndUpdate({_id: reply.comment_id}, {$push :{replies: reply._id}})
        .then(updatedComment => {
            return res.status(200).json({
                msg: 'Dodano odpowiedź'
            })
            
        })
    })
    .catch(err => {
        console.log(err)
        return res.status(400).json({
            msg: 'Ups, coś poszło nie tak'
        })
    })
}