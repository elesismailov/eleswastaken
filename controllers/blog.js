
const Post = require('../models/post');

exports.getIndex = function(req, res) {

	const limit = req.query.number || 7;

	Post.find().limit(limit).exec( (err, posts) => {
		res.render('blogIndex', { posts })
	});

}

exports.getPost = async function(req, res) {

	const post = await Post.findById(req.params.id);

	if (!post) {
		res.sendStatus(404)
		return 
	}

	res.render('blogPost', { post });

}
