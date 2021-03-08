const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema ({
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
      },
      author: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        username: String
      }
})
module.exports = mongoose.model('Comment', Comment)