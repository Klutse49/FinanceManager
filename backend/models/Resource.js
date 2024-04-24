const express = require('express');
const router = express.Router();
const Resource = require('./Resource');  

// Create Resource
router.post('/', async (req, res) => {
    const resource = new Resource(req.body);
    await resource.save();
    res.status(201).send(resource);
});

// Read Resources
router.get('/', async (req, res) => {
    const resources = await Resource.find();
    res.send(resources);
});

// Update Resource
router.put('/:id', async (req, res) => {
    const updatedResource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedResource);
});

// Delete Resource
router.delete('/:id', async (req, res) => {
    await Resource.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

module.exports = router;
