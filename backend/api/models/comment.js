const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    content_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String
    },
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'commentReply'
        }
    ]
})

module.exports = mongoose.model('comment', commentSchema)