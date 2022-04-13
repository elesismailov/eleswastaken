const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title: {type: String, required: true},
	subtitle: {type: String, required: true},
	body: {type: String, required: true},
	date: {type: Date, required: true},
});

PostSchema
	.virtual('url')
	.get(function() {
		return '/log/logs/' + this._id
	});

module.exports = mongoose.model('LogPost', PostSchema);

