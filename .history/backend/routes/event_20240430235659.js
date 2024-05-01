const express = require('express');
const router = express.Router();
const Event = require(''

// Get all events for a user
router.get('/:userId', async (req, res) => {
    try {
        const events = await Event.find({ user: req.params.userId });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new event
router.post('/', async (req, res) => {
    const event = new Event({
        title: req.body.title,
        start: req.body.start,
        end: req.body.end,
        type: req.body.type,
        user: req.body.user
    });
    try {
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an event
router.patch('/:id', async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an event
router.delete('/:id', async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted Event' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
