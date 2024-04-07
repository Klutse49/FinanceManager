const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource'); // Adjust this path to where your model is located

// Middleware to find a resource by ID
async function getResource(req, res, next) {
    let resource;
    try {
        resource = await Resource.findById(req.params.id);
        if (resource == null) {
            return res.status(404).json({ message: 'Cannot find resource' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.resource = resource;
    next();
}

// POST: Create a new resource
router.post('/', async (req, res) => {
    const newResource = new Resource(req.body);
    try {
        const savedResource = await newResource.save();
        res.status(201).json(savedResource);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET: Read all resources
router.get('/', async (req, res) => {
    try {
        const resources = await Resource.find();
        res.json(resources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Read a single resource by ID
router.get('/:id', getResource, (req, res) => {
    res.json(res.resource);
});

// PATCH: Update a resource
router.patch('/:id', getResource, async (req, res) => {
    Object.entries(req.body).forEach(([key, value]) => {
        res.resource[key] = value;
    });

    try {
        const updatedResource = await res.resource.save();
        res.json(updatedResource);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE: Remove a resource
router.delete('/:id', getResource, async (req, res) => {
    try {
        await res.resource.remove();
        res.json({ message: 'Deleted Resource' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
