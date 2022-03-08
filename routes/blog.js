
const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blog');

router.get('/', blogController.getIndex);

router.get('/post/:id', blogController.getPost);
/*

router.put('/:id', blogController.putPost);

*/
module.exports = router;
