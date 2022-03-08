
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title: {type: String, required: true},
	body: {type: String, required: true},
	date: {type: Date, required: true},
});

PostSchema
	.virtual('url')
	.get(function() {
		return '/blog/post/' + this._id
	});

module.exports = mongoose.model('Post', PostSchema);
