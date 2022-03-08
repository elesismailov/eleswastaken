const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/', function(req, res) {});

router.get('/log-in', adminController.getLogIn);

router.post('/log-in', adminController.postLogIn);

router.get('/post', adminController.getPost);

router.post('/post', adminController.postPost);


module.exports = router;
