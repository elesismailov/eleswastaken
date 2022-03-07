
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title: {type: String},
	body: {type: String},
	date: {type: Date},
});



module.exports = mongoose.model('Post', PostSchema);
