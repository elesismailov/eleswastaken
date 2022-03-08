
const Post = require('../models/post');

exports.getIndex = function(req, res) {

	const limit = req.query.number || 7;

	Post.find().limit(limit).exec( (err, posts) => {
		res.render('blogIndex', { posts })
	});

}

exports.getPost = function(req, res) {

}
