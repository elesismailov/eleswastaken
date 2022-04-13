
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const BlogPost = require("../models/post");
const LogPost = require('../models/logPost');

exports.getIndex = function(req, res) {
	res.render('admin/index');
}

exports.getLogIn = function(req, res) {
	if (!req.cookies) {
		res.render('admin/loginForm');
		return
	}

	const token = req.cookies.jwt_token;

	if (!token) {
		res.render('admin/loginForm');
		return
	}

	jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
		if (err) {
			res.render('admin/loginForm');
			return
		} 

		// check whether the decoded data is in the db
		User.findById(decoded.id).exec( (err, user) => {
			if (err || !user) {
				res.status(404).send('User does not exist');
				return
			}
			res.redirect('/admin');
		})
	});
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

exports.getBlogPost = function(req, res) {
	res.render('admin/blog/newPost');
}

exports.postBlogPost = function(req, res) {
	const { title, subtitle, body } = req.body;
	
	if (! (title && body)) {
		res.status(400).send('Something is missing');
		// redirect back to the post form with the data
		// but also with errors
		return
	}
	
	const post = new BlogPost({
		title,
		subtitle,
		body,
		date: new Date(),
	});

	post.save( err => {
		if (err) {
			console.log(err)
			res.sendStatus(500);
			return 
		}
		res.redirect(post.url);
	});

}

exports.getLogPost = function(req, res) {
	res.render('admin/log/newPost')
}

exports.postLogPost = function(req, res) {
	
	const { title, subtitle, body } = req.body;
	
	if (! (title && body)) {
		res.status(400).send('Something is missing');
		// redirect back to the post form with the data
		// but also with errors
		return
	}
	
	const post = new LogPost({
		title,
		subtitle,
		body,
		date: new Date(),
	});


	post.save( err => {
		if (err) {
			console.log(err)
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



