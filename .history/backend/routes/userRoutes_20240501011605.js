// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).send({ message: 'Failed to register user', error: error.message });
    }
});

// Login User
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token, message: 'Login successful' });
    } catch (error) {
        res.status(500).send({ message: 'Server error', error: error.message });
    }
});

router.put('/:userId/profile', async (req, res) => {
    const { userId } = req.params;
    const profileData = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, profileData, { new: true });
      if (!updatedUser) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.send(updatedUser);
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).send({ message: 'Failed to update user profile' });
    }
  });
  

module.exports = router;
