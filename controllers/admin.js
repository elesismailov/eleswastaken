
const jwt = require('jsonwebtoken');

const User = require('../models/user');

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
		res.redirect('/');	
		return
	}

	res.status(400).send('Incorrect password');
}

exports.getPost = function(req, res) {
	res.render('admin/postForm');
}

exports.postPost = function(req, res) {

}
