const express = require('express');
const { register } = require('../controllers/auth/register');
const { login } = require('../controllers/auth/login');
const { validateRequest, userSchema } = require('../middleware/validation');

const router = express.Router();

// User registration route (no auth required)
router.post('/register', validateRequest(userSchema), register);

// User login route (no auth required)
router.post('/login', validateRequest(userSchema), login);

module.exports = router;