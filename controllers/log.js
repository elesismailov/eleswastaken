
const showdown = require('showdown');
const LogPost = require('../models/logPost');

exports.getIndex = function(req, res) {

	// const limit = req.query.number || 7;

	// Post.find().limit(limit).exec( (err, logs) => {
	LogPost.find().exec( (err, logs) => {
		res.render('log/index', { logs })
	});

}

exports.getPost = async function(req, res) {

	const post = await LogPost.findById(req.params.id);

	converter = new showdown.Converter();

	if (!post) {
		res.sendStatus(404)
		return 
	}

	htmlBody = converter.makeHtml(post.body)
	post.body = htmlBody

	res.render('logPost', { post });

}
