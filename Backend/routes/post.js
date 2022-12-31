const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth')

const postsController = require('../controllers/post');

router.post('/post', auth.authenticate , postsController.Post)

router.get('/get', auth.authenticate , postsController.Get)

router.delete('/delete/:id', postsController.Delete)

module.exports = router;