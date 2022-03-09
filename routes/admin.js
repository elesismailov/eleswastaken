const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');
const authenticate = require('../middleware/auth');

router.get('/', authenticate, function(req, res) {
	res.send('the index page');
});

router.get('/log-in', adminController.getLogIn);

router.post('/log-in', adminController.postLogIn);

router.get('/log-out', adminController.logOut);

router.get('/post', authenticate, adminController.getPost);

router.post('/post', authenticate, adminController.postPost);


module.exports = router;
