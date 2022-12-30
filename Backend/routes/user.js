const express = require('express');

const router = express.Router();

const usersController = require('../controllers/user');

router.post('/users', usersController.createUser)

router.get('/users/:creds', usersController.findUser)

module.exports = router;