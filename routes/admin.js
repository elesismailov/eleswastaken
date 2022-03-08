const express = require('express');
const router = express.Router();

const adminController = require('../conrollers/admin.js');

router.get('/', function(req, res) {});

router.get('/log-in', adminController.getLogIn);

router.post('/log-in', adminController.postLogIn);

router.get('/post', postController.getPost);

router.post('/post', postController.postPost);


module.exports = router;
