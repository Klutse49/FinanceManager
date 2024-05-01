// Import necessary modules
const express = require('express');
const router = express.Router();
const User = require('../models/user'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();
    
    console.log("User created:", user); // Logging the user object after creation

    // Respond with success message
    res.status(201).send({ message: 'User created successfully', userId: user._id });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).send({ message: 'Failed to create user', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
      console.log("Received login request:", req.body); // Debug the received credentials
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email: email.toLowerCase().trim() });
      if (!user) {
          console.log("No user found for email:", email); // Debugging output
          return res.status(404).send({ message: 'User not found' });
      }

      // Compare submitted password with hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password match result:", isMatch); // Debugging output

      if (!isMatch) {
          return res.status(401).send({ message: 'Invalid credentials' });
      }

      // Create token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log("Token generated:", token); // Debugging output

      // Respond with token and user info
      res.send({ token, userId: user._id, message: 'Login successful' });
  } catch (error) {
      console.error("Login error:", error);
      res.status(500).send({ message: 'Server error', error: error.message });
  }
});


// Export the router
module.exports = router;
