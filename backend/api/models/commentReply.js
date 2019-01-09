const mongoose = require('mongoose')

const commentReply = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    postedAt: {
        type: Date,
        default: Date.now()
    },
    content: {
        type: String
    }
})

module.exports = mongoose.model('commentReply', commentReply)