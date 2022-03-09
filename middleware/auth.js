const jwt = require('jsonwebtoken');

const User = require('../models/user');

function authenticate(req, res, next) {
	if (!req.cookies) {
		res.redirect('/admin/log-in');
		return
	}

	const token = req.cookies.jwt_token;

	if (!token) {
		res.redirect('/admin/log-in');
		return
	}

	jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
		if (err) {
			res.redirect('/admin/log-in');
			return
		} 

		// check whether the decoded data is in the db
		User.findById(decoded.id).exec( (err, user) => {
			if (err || !user) {
				res.status(404).send('User does not exist');
				return
			}
			next()
		})
	});
};

module.exports = authenticate;
