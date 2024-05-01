const express = require('express');
const router = express.Router();
const ContactForm = require('../models/ContactForm'); 

// Route to create a new contact form submission
router.post('/', async (req, res) => {
    // Extract form data from request body
    const { name, email, message } = req.body;

    try {
        // Create a new instance of ContactForm model
        const newSubmission = new ContactForm({
            name,
            email,
            message
        });

        // Save the submission to the database
        const savedSubmission = await newSubmission.save();

        // Respond with the saved submission data
        res.status(201).json(savedSubmission);
    } catch (error) {
        // Handle errors during submission
        res.status(400).json({ message: error.message });
    }
});

// Route to fetch all contact form submissions
router.get('/', async (req, res) => {
    try {
        // Retrieve all submissions from the database
        const submissions = await ContactForm.find();

        // Respond with the submissions data
        res.json(submissions);
    } catch (error) {
        // Handle errors during retrieval
        res.status(500).json({ message: error.message });
    }
});

// Export the router to use in the main Express app
module.exports = router;
