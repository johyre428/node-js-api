const express = require('express');

const checkAuth = require('../middleware/check-auth.middleware');

const UsersController = require('../controllers/user.controller');

const router = express.Router();

router.get('/', checkAuth, UsersController.getAllUsers);

router.post('/signup', UsersController.signUpUser);

router.post('/login', UsersController.loginUser);

router.delete('/:id', checkAuth, UsersController.deleteUser);

module.exports = router;
