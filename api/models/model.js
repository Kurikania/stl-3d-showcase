const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Model = new Schema ({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  coverImage: {
    type: String,
    required: true
  },
  coverImageType: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  modelType: {
    type: String,
    required: true
  },
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String	
	
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
})

Model.virtual('coverImagePath').get(function() {
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
  }
})


module.exports = mongoose.model('Model', Model)