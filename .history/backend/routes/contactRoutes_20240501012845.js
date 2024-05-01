const express = require('express');
const router = express.Router();
const ContactForm = require('../models/ContactForm');
const rateLimit = require('express-rate-limit'); 

// Rate limit configuration for preventing abuse
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

// Apply rate limiting to all requests
router.use(apiLimiter);

// Route to create a new contact form submission with basic validation
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    // Simple validation checks
    if (!email.includes('@')) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }
    if (!name.trim() || !message.trim()) {
        return res.status(400).json({ message: 'Name and message cannot be empty.' });
    }

    try {
        const newSubmission = new ContactForm({
            name,
            email,
            message
        });
        const savedSubmission = await newSubmission.save();
        res.status(201).json(savedSubmission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Assuming you have a model like this for the contact form:
const ContactForm = mongoose.model('ContactForm', new mongoose.Schema({
    name: String,
    email: String,
    message: String
  }));
  
  // And your route for handling contact form submissions might look something like this:
  router.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).send('All fields are required.');
    }
  
    try {
      const newContact = new ContactForm({ name, email, message });
      await newContact.save();
      res.status(201).send('Message sent successfully.');
    } catch (error) {
      console.error('Failed to send message:', error);
      res.status(500).send('Failed to send message. Please try again later.');
    }
  });

// Export the router to use in the main Express app
module.exports = router;
