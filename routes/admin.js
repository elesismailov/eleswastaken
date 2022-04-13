const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');
const authenticate = require('../middleware/auth');

router.get('/', authenticate, adminController.getIndex);

router.get('/log-in', adminController.getLogIn);

router.post('/log-in', adminController.postLogIn);

router.get('/log-out', adminController.logOut);

router.get('/blog-post', authenticate, adminController.getBlogPost);

router.post('/blog-post', authenticate, adminController.postBlogPost);

router.get('/log-post', authenticate, adminController.getLogPost);

router.post('/log-post', authenticate, adminController.postLogPost);

module.exports = router;
