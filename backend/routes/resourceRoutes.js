// routes/resourceRoutes.js
const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

// Create Resource
router.post('/', async (req, res) => {
    try {
        const resource = new Resource(req.body);
        await resource.save();
        res.status(201).send(resource);
    } catch (error) {
        res.status(400).send({ message: 'Failed to create resource', error: error.message });
    }
});

// Read Resources
router.get('/', async (req, res) => {
    try {
        const resources = await Resource.find();
        res.send(resources);
    } catch (error) {
        res.status(500).send({ message: 'Failed to get resources', error: error.message });
    }
});

// Update Resource
router.put('/:id', async (req, res) => {
    try {
        const updatedResource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedResource) {
            return res.status(404).send({ message: 'Resource not found' });
        }
        res.send(updatedResource);
    } catch (error) {
        res.status(400).send({ message: 'Failed to update resource', error: error.message });
    }
});

// Delete Resource
router.delete('/:id', async (req, res) => {
    try {
        const deletedResource = await Resource.findByIdAndDelete(req.params.id);
        if (!deletedResource) {
            return res.status(404).send({ message: 'Resource not found' });
        }
        res.status(204).send({ message: 'Resource deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete resource', error: error.message });
    }
});

module.exports = router;
