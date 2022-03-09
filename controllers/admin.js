
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Post = require('../models/post');

exports.getIndex = function(req, res) {
	res.render('admin/index');
}

exports.getLogIn = function(req, res) {
	res.render('admin/loginForm');
}

exports.postLogIn = async function(req, res) {
	const { email, password } = req.body;
	if (!( email && password )) {
		res.sendStatus(400);
		return
	}

	const user = await User.findOne({ email });
	if (!user) {
		res.sendStatus(400);
		return 
	}
	
	if (user.password === password) {
		const token = jwt.sign( 
			{ email, id: user._id },
			process.env.JWT_KEY,
		);
		res.cookie('jwt_token', token, {
			httpOnly: true,
		});
		res.redirect('/admin');	
		return
	}

	res.status(400).send('Incorrect password');
}

exports.getPost = function(req, res) {
	res.render('admin/postForm');
}

exports.postPost = function(req, res) {
	console.log(req.body);
	const { title, body } = req.body;
	
	if (! (title && body)) {
		res.status(400).send('Something is missing');
		// redirect back to the post form with the data
		// but also with errors
		return
	}
	
	const post = new Post({
		title,
		body,
		date: new Date(),
	});

	post.save( err => {
		if (err) {
			res.sendStatus(500);
			return 
		}
		res.redirect(post.url);
	});

}


exports.logOut = function(req, res) {
	res.clearCookie('jwt_token');
	res.redirect('/');
}



