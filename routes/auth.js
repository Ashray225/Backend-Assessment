const express = require('express');
const { register } = require('../controllers/auth/register');
const { login } = require('../controllers/auth/login');

const router = express.Router();

// User registration route (no auth required)
router.post('/register', register);

// User login route (no auth required)
router.post('/login', login);

module.exports = router;