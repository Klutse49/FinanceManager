const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget'); 


// POST: Create a new Budget
router.post('/', async (req, res) => {
  try {
    // Hardcoded values for budget
    const hardcodedBudget = {
      category: 'Food',
      amount: 500
    };
  });


// GET: Retrieve all Budgets
router.get('/', async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Update a Budget by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedBudget = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBudget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Delete a Budget by ID
router.delete('/:id', async (req, res) => {
  try {
    await Budget.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted Successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
