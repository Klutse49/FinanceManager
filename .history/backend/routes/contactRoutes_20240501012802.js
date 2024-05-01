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

// Route to fetch all contact form submissions with pagination
router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default page 1 and limit 10

    try {
        const submissions = await ContactForm.find()
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .exec();

        const count = await ContactForm.countDocuments();
        res.json({
            submissions,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Export the router to use in the main Express app
module.exports = router;
