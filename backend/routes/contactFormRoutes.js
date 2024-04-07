const express = require('express');
const router = express.Router();
const ContactForm = require('../models/ContactForm'); // Adjust the path to your actual model file

// Route to create a new contact form submission
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;
    const newSubmission = new ContactForm({
        name,
        email,
        message
    });

    try {
        const savedSubmission = await newSubmission.save();
        res.status(201).json(savedSubmission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const submissions = await ContactForm.find();
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
