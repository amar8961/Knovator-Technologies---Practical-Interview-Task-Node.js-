const express = require('express');

const router = express.Router();

const postsController = require('../controllers/post');

router.post('/post', postsController.Post)

module.exports = router;