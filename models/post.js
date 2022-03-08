
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title: {type: String, required: true},
	body: {type: String, required: true},
	date: {type: Date, required: true},
});

// virtual property url
//		either a title or id


module.exports = mongoose.model('Post', PostSchema);
