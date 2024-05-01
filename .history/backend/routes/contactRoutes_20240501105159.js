const express = require('express');
const router = express.Router();
const ContactForm = require('../models/ContactForm'); 
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

// Rate limit configuration to prevent abuse
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

// Apply rate limiting to all requests
router.use(apiLimiter);

// Route to create a new contact form submission
router.post('/',[]
    body('name').not().isEmpty().withMessage('Name cannot be empty.'),
    body('email').isEmail().withMessage('Please use a valid email address.'),
    body('message').not().isEmpty().withMessage('Message cannot be empty.')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, message } = req.body;
        const newContact = new ContactForm({ name, email, message });
        const savedSubmission = await newContact.save();
        res.status(201).json(savedSubmission);
    } catch (error) {
        console.error('Failed to send message:', error);
        res.status(500).json({ message: 'Failed to send message. Please try again later.', error: error.message });
    }
});

// Export the router to use in the main Express app
module.exports = router;
