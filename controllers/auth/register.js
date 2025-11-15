const bcrypt = require('bcryptjs');
const User = require('../../models/User');

/**
 * Creates new user account with encrypted password after validating email uniqueness
 * @param {Object} req - Contains email and password in request body
 * @param {Object} res - Returns success message on successful registration
 */
const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
   
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      email,
      passwordHash
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { register };